const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express();


app.use(express.json())
app.use(cors());

const posts = {};

const handleEvents = (type,data) => {
    if (type === "PostCreated"){
        const {id,title} = data;
        posts[id] = {id,title,comments:[]}
    }

    if (type === "CommentCreated"){
        const {id,content,postId,status} = data;
        posts[postId].comments.push({id,content,status});
    }

    if (type === "CommentUpdated"){
        const {id,content,postId,status} = data; 

        const comments = posts[postId].comments;
        let comment = comments.find(comment => comment.id === id)
        comment.status = status
        comment.content = content;

    }
}

app.get("/posts", (req,res)=>{
    res.status(200).json(posts)
})

app.post("/events", (req,res)=>{
    const {type,data} = req.body;
    handleEvents(type,data);

    res.send({});
})


const port = 5003
 
const start= async() =>{
    try {
        app.listen(port,async ()=>{
            console.log(`Query Services running on port ${port}`)

            const result = await axios.get("http://localhost:5005/events");

            for(let event of result.data){
                console.log("Processing event:",event.type);
                handleEvents(event.type,event.data);
            }
        })

    } catch (error) {
        console.log(error);
    }
}

start()