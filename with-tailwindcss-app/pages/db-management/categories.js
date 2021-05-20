// insert/ remove categories/sub categories


import 'tailwindcss/tailwind.css'
import React from "react"
import {useForm} from "react-hook-form"

// box to remve/add by name

// table to remove from list

export default function ReplenishmentsView(props) {
    var errorScript;
    const {register, handleSubmit, errors } = useForm()

    const onSubmit = data => {
        console.log(data)   
    };
    function doo(data) {
        console.log(data)
    }

    console.log("hi")
    return <div >
        <h1 >Big Data </h1> 
        <form action="/api/a" onSubmit={onSubmit} method="POST">
            <div>Manage Categories</div>

            <div >
                <input name='test' value='something'></input>
                <input id='ainsert' inputRef={register('operation')} name='operation' type="radio" value="INSERT" required>
                    
                </input>
                <label htmlFor="insert">Insert</label>
                <input id='aremove' name='operation' {...register} type="radio" value="DELETE"></input>
                <label htmlFor="aremove">Remove</label>
            </div>

            <div>
                <input id='acategory' inputRef={register('superOrSimple')} name='superOrsimple' type="radio" value="super" required></input>
                <label htmlFor="acategory">Super Category</label>
                <input id='asubcategory' inputRef={register('superOrSimple')} name='superOrsimple' type="radio" value="simple"></input>
                <label htmlFor="asubcategory">Simple Category</label>
            </div>

            <input type="text" name='category' inputRef={register('category')} autoComplete='on' multiple id="category" placeholder="insert category name" required></input>

            <input type="submit" onClick= {(eve)=>console.log(eve)} value="Submit"></input>
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