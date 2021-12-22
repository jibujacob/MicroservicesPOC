const express = require("express")
const axios = require("axios")

const app = express();

app.use(express.json());

app.post("/events",async (req,res)=>{
    const {type,data} = req.body;

    if(type === "CommentCreated"){
        const status = data.content.toLowerCase().includes("orange") ? "rejected" : "approved";

        await axios.post("http://localhost:5005/events",{
            type:"CommentModerated",
            data:{
                id:data.id,content:data.content,postId:data.postId,status
            }
    })
    }

    res.send({});
})


const port = 5004

const start= async() =>{
    try {
        app.listen(port,()=>console.log(`Moderation Services running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()