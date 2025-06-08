const express=require('express')
const bodyParser=require('body-parser')

const app=express()

app.use(bodyParser.json())      // we use this middleware to parse the body into json format 
// and we can use express.json() middleware to parse the body in the json
app.post('/sum/:a/:b',(req,res) =>{
    console.log(req.body)

    const a = parseInt(req.body.a)
    const b = parseInt(req.body.b)

    res.json({
        ans : a+b
    })
})

app.listen(3000)