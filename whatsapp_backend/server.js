import express from 'express'
const app=express()
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'
const port=process.env.PORT|| 9000

//Middleware
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>
{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    next();
});


//DB config
const url="mongodb+srv://admin:Dv9424934024@cluster0.jyz03.mongodb.net/whatsappbd?retryWrites=true&w=majority"
mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})



const pusher = new Pusher({
  appId: "1165052",
  key: "13856bd5d777b6e1b980",
  secret: "0cf299c46adb69477d3e",
  cluster: "ap2",
  useTLS: true
});


const db=mongoose.connection;
db.once('open',()=>
{
    console.log("DB Connected");
    const mgsCollection=db.collection("messagecontents")
    const changeStream=mgsCollection.watch();
    changeStream.on('change',(change)=>
    {   
    
        if(change.operationType==="insert")
        {
            const messageDetails=change.fullDocument;
            pusher.trigger('messages','inserted',
            {  
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                receiver:messageDetails.receiver
            })
            
        }
        else
        {
            console.log("Error Triggering Pusher");
        }
    });
});
//API config
app.get('/',(req,res)=>
{
    res.status(200).send("Hello World")
})

app.post('/messages/new',(req,res)=>
{
    const dbMessage=req.body;
    Messages.create(dbMessage,(err,data)=>
    {
      
        if(err)
        {
            res.status(500).send(err)
        }
        else
        {
            res.status(201).send(data)
        }
    })
})
app.get('/messages/sync',(req,res)=>
{
    Messages.find((err,data)=>
    {
        if(err)
        {
            res.status(500)
        }
        else
        {
            res.status(200).send(data)
        }
    })
})

app.listen(port,()=>
{
    console.log(`working on port ${port}`);
})