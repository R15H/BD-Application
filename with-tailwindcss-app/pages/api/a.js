// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {Client, ClientBase} = require('pg')
const {pool,credentials} = require("../../db.js")

const threateningMessage ="Unexpected field value. This should never happen here. You action was recorded." 


// await is only allowed inside async functions! remove the async atributte and we lose everything life has to give. Why?
export default async function alineaA(req, res) {
  var {operation, type, category } = req.body
  var userFriendlyType = type
  console.log(operation, type, category)
  var baseQuery;
  try{
    switch(operation){
      case 'INSERT':
        baseQuery = ["INSERT INTO category VALUES ($1::text)","INSERT INTO % VALUES ($1::text)"]
        break
      case 'DELETE':
        // first delete from the super/simple category table to conform with integrity constrains
        baseQuery = ["DELETE FROM % c WHERE c.name = $1::text","DELETE FROM category c WHERE c.name =  $1::text" ]
        break
      default:
        return res.status(400).json({message : threateningMessage})
    }

    switch(type){
      case 'super':
        type = "super_category"
        break
      case 'simple':
        type = "simple_category"
        break
      default:
        return res.status(400).json({message : threateningMessage })
    }

    const client = await pool.connect()
    try{
      let statements = []
      await client.query('BEGIN')

      // delete category from simple/super category table
      let queryText = baseQuery[0].replace('%', type)
      statements.push( await client.query(queryText, [category]) ) 
      if ( statements[0].rowCount == 0 ) 
        return res.status(400).json({message:"The specified category does not exist."})

      // delete category from category table
      queryText = baseQuery[1].replace('%', type)
      statements.push( await client.query(queryText, [category]) ) 


      await client.query('COMMIT')
      return res.status(200).json({message:"Operation performed with success!", data : statements})
    }
    catch(e){
      await client.query('ROLLBACK')
      throw e
    }
    finally{
      client.release()
    }

    
  } catch (err) {
    console.log(err)
    let msg;
    // Friendlify most common errors
    switch(err.constraint){
      case "product_associated_to_name_fkey":
        msg = 'Error: Please remove all the products that belong to this category before trying to delete it.' 
        break
      case "simple_category_name_fkey":
      case "super_category_name_fkey":
        msg = `Error: The specified category is not a ${userFriendlyType} category.`
        break
      default:
        msg = err.message
    }
    return res.status(400).json({message: msg}) // warning: exposes internal state of server
  }
}
