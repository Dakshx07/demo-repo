const express=require('express')

const app=express()

let reqcount=0
function reqCount(req,res,next){
    reqcount++
    next()  
}

app.use(reqCount)

app.get("/sum/:a/:b", function(req, res) {
    const a = parseInt(req.params.a)
    const b = parseInt(req.params.b)

    res.json({
        ans: a + b
    })
});

app.get("/mul/:a/:b", function(req, res) {

    const a = parseInt(req.params.a)
    const b = parseInt(req.params.b)

    res.json({
        ans: a * b
    })
});

app.get('/admin',(req,res) => {
    res.json({
        message:`Total request on the server is :${reqcount}`
    })
})

app.listen(3001, ( ) => {
    console.log("Sever running....");
    
});