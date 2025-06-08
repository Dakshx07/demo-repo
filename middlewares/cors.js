const express=require('express')

const app=express()

// use CORS middleware to host the forntend and backend on differnt localhost and through cors we can connect frontend with backend 

app.use(express.json())

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/cors.html')                 
})

app.post('/sum', (req,res) => {
     const a = parseInt(req.body.a)
    const b = parseInt(req.body.b)

    res.json({
        answer : a + b
    })
})

app.listen(3005 ,( ) => {
    console.log("Server is running....");
})