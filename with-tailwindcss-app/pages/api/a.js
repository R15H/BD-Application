// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {Client, ClientBase} = require('pg')
const {pool,credentials} = require("../../db.js")

const threateningMessage ="Unexpected field value. This should never happen here. You action was recorded." 


// await is only allowed inside async functions! remove the async atributte and we lose everything life has to give. Why?
export default async function alineaA(req, res) {
  console.log(req.query)
  var {operation, superOrsimple, category } = req.query 
  var baseQuery;

  try{
    switch(operation){
      case 'INSERT':
        baseQuery = "INSERT INTO category VALUES ($1::text); INSERT INTO % VALUES ($1::text)"
        break
      case 'DELETE':
        baseQuery = 'DELETE FROM category WHERE category = $1::text; DELETE FROM % WHERE name = $1::text'
        break
      default:
        return res.status(400).json({message : threateningMessage})
    }

    switch(superOrsimple){
      case 'super':
        superOrsimple = "super_category"
        break
      case 'simple':
        superOrsimple = "simple_category"
        break
      default:
        return res.status(400).json({message : threateningMessage })
    }

    const client = await pool.connect()
    try{
      await client.query('BEGIN')
      const queryText = baseQuery.replace('%', superOrsimple)
      const res = await client.query(queryText, [category]) // always separate this kind of statements into two parts
      await client.query('COMMIT')
    }
    catch(e){
      await client.query('ROLLBACK')
      throw e
    }
    finally{
      client.release()
    }

    return res.status(200).json({message:"Operation performed with success!", data : result})
  } catch (err) {
    return res.status(400).json({message: err.message})
  }

}
