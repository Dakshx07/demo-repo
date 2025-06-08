const express = require("express");

const app = express();

function middleware(req,res,next){
    console.log(`Method of the request is : ${req.method}`);
    console.log(`Url of the Request is : ${req.path}`);
    console.log(`TimeStamp of the request is : ${new Date().toLocaleString()}`);
    next()
}

app.use(middleware)

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

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3001);