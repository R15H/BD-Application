const { Client, Pool } = require('pg')


const PGHOST="db.tecnico.ulisboa.pt"
const PGUSER="ist196723"
const PGDATABASE="postgres"
const PGPASSWORD="tecnicoeomaior"
const PGPORT=5432

const credentials = {
  user: PGUSER, host: PGHOST, database: PGDATABASE, password: PGPASSWORD, port: PGPORT 
}

const  client = new Client( credentials
)
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  if(err === null){
    console.log("Client is alive :D")
  }
})

export async function isolatedQuery(q, values) {
  try {
    const results = await client.query(q, values)
    await client.end()
    return results
  } catch (e) {
    console.log('lol')
    console.log(e.message)
    throw Error(e.message)
  }
}

const pool = new Pool(credentials)

module.exports = {pool, credentials} 

