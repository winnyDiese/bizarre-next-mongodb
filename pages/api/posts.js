
import clientPromise from "../../lib/mongodb";
import { useEffect } from "react";

export default async function handler(){

    const client = await clientPromise
    const db = client.db("nextjs-mongodb-demo")

    switch(req.method){
        case "POST" : 
            let bodyObject = JSON.parse(req.body)
            let myPost = await db.collection("posts").insertOne(bodyObject)

            res.json(myPost.ops[0])
            break

        case "GET" :
            const allPosts = await db.collection("allPost").find({}).toArray()

            res.json({ status: 200, data: allPosts})
            break
    }

}

// Retrieve (get) les datas
export async function getServerSideProps(){
    let res = await fetch("http://localhost:3000/api/posts",{
        method: "GET",
        headers: {
            "Content-type":"application/json"
        }
    })

    let allPosts = await res.json()

    return {
        props : {allPosts}
    }
}


// Insert data
useEffect(()=>{
    setPostsState(allPosts)
}, [allPosts])

let submitForm = async e =>{
    
    setLoading(true)
    e.preventDefault()

    let res = await fetch("http://localhost:3000/api/posts",{
        method: "POST",
        body: JSON.stringify({
            title: title,
            content: content
        })
    })

    res = await res.json()
    setPostsState([...postsState, res])
    setTitle("")
    setContent("")
    setLoading("")
}
