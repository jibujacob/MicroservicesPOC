const express = require("express")
const axios = require("axios")
const cors = require("cors")


const app = express();

app.use(express.json())
app.use(cors())

const events = [];

app.get("/events",(req,res)=>{
    res.send(events)
})

app.post("/events", (req,res)=>{
    const event = req.body;
    events.push(event)
        axios.post("http://posts-clusterip-srv:5001/events",event).catch(err=>console.log(err))
        axios.post("http://comments-srv:5002/events",event).catch(err=>console.log(err))
        axios.post("http://query-srv:5003/events",event).catch(err=>console.log(err))
        axios.post("http://moderation-srv:5004/events",event).catch(err=>console.log(err))
        res.json({status:"OK"})

})


const port = 5005

const start= async() =>{
    try {
        app.listen(port,()=>console.log(`Event Bus Services running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()