const express = require("express")
const crypto = require("crypto")
const cors = require("cors")

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

app.post("/posts/:id/comments",(req,res)=>{
    const {id:postId} = req.params; 
    const commentId = crypto.randomBytes(4).toString("hex");
    const {content}  = req.body;
    
    const comments = commentsByPostId[postId] || [];

    comments.push({commentId,content});

    commentsByPostId[postId] = comments;

    res.status(200).json(comments)
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