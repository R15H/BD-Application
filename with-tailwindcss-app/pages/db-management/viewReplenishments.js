// List replenishment events for a *given* product, including the number 
//of replenished units;

// **a box to search for a replenishment of a *given* product**

// a table to view the list of all replenishments

dbconnection = require('../../db.js')


export default function ReplenishmentsView(){
    


}


export async function getServerSideProps(context){
    
    

    props = dbconnection.query()

    return { props: props}
}