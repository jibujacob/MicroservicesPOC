const express = require("express")
const crypto = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express();

const commentsByPostId = {};

app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({msg:"Comment Services Running"})
})

app.get("/posts/:id/comments",(req,res)=>{
    res.status(200).json(commentsByPostId[req.params.id ])
})

app.post("/posts/:id/comments",async (req,res)=>{
    const {id:postId} = req.params; 
    const commentId = crypto.randomBytes(4).toString("hex");
    const {content}  = req.body;
    
    const comments = commentsByPostId[postId] || [];

    comments.push({commentId,content,status:"pending"});

    commentsByPostId[postId] = comments;
    await axios.post("http://event-bus-srv:5005/events",{
        type:"CommentCreated",
        data:{
            id:commentId,content,postId,status:"pending"
        }
    })

    res.status(200).json(comments)
})

app.post("/events" , async(req,res) => {
    const {type,data} = req.body;
    
    if (type === "CommentModerated"){ 
        const {id,postId,status} = data;
        const comments = commentsByPostId[postId];
        let comment = comments.find(comment => comment.commentId === id);
        comment.status = status;

        await axios.post("http://event-bus-srv:5005/events",{type:"CommentUpdated",data})
    }
    
    res.send({})
})

const port = 5002

const start= async() =>{
    try {
        app.listen(port,()=>console.log(`Comment Services running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()