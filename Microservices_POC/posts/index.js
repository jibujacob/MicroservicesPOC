const express = require("express")
const crypto = require("crypto")
const cors = require("cors")

const app = express();

const posts = {};

app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({msg:"Post Services Running"})
})

app.get("/posts",(req,res)=>{
    res.status(200).json(posts)
})

app.post("/posts",(req,res)=>{
    const id = crypto.randomBytes(4).toString("hex");
    const {title}  = req.body;
    posts[id] = {
        postId:id,title
    }
    res.status(200).json(posts[id])
})

const port = 5001

const start= async() =>{
    try {
        app.listen(port,()=>console.log(`Post Services running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()