// insert/ remove categories/sub categories


import 'tailwindcss/tailwind.css'

// box to remve/add by name

// table to remove from list

export default function ReplenishmentsView(props) {
    var errorScript;
    const onSubmit = async event => {
        event.preventDefault()
        const fields = (field) => event.target[field].value
        
        const data = {
          category: fields('category'),
          operation: fields('operation'),
          type: fields('superOrSimple')
        }
        var res = await fetch(
            '/api/a',
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )//.then(response  => response.text()).then(resp => console.log(resp))
    res = await res.text()
    console.log(res)
        // clear form -> event.target.reset()
    };

    console.log("hi")
    return <div >
        <h1 >Big Data </h1> 
        <form  onSubmit={onSubmit} >
            <div>Manage Categories</div>

            <div >
                <input id='ainsert' htmlFor='operation' name='operation' type="radio" value="INSERT" required>
                    
                </input>
                <label htmlFor="insert">Insert</label>
                <input id='aremove' htmlFor='operation'name='operation'  type="radio" value="DELETE"></input>
                <label htmlFor="aremove">Remove</label>
            </div>

            <div>
                <input id='acategory'htmlFor="superOrSimple"  name='superOrSimple' type="radio" value="super" required></input>
                <label htmlFor="acategory">Super Category</label>
                <input id='asubcategory'  htmlFor='superOrSimple' name='superOrSimple'  type="radio" value="simple"></input>
                <label htmlFor="asubcategory">Simple Category</label>
            </div>

            <input type="text" name='category'  autoComplete='on' multiple id="category" placeholder="insert category name" required></input>

            <input type="submit" htmlValue="Submit"></input>
        </form>
        <div id='aoutput' >
        </div>
        </div>


}


export async function getServerSideProps(context) {
    var p = { status: 'OK' };
    const dbconnection = require('../../db.js')

    const insertCategory = "INSERT INTO categories VALUES($1::VARCHAR(80))"
    const insertSuperCategory = "INSERT INTO super_category VALUES($1::VARCHAR(80))"
    const insertSimpleCategory = "INSERT INTO simple_category VALUES($1::VARCHAR(80))"

    try {
        p = await dbconnection.query(insertCategory, ["HiWorldHello"])
    }
    catch (e) {
        p = { status: 'NOTOK', message: e.message }
    }

    console.log(p)

    return { props: p }
}