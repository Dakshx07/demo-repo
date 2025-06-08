const express= require('express')

const app=express()

let totalRequest=0
function requestIncreser(req,res,next) {
     totalRequest++
    console.log(`Total reuqets count :- ${totalRequest}`);
    req.name="daksh77777"
    
    
    res.json({
        message:"I ended the request early "
    })
}

function realSumHandler(req,res){
    
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)

    console.log(req.name);
    

    res.json({
        ans:a+b
    })
}

function realMulHandler(req,res){
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)


    res.json({
        ans:a*b
    })
}

app.use(requestIncreser)   // so thta we dont hav eadd reqIncerser in each route

app.get('/sum/:a/:b',realSumHandler)

app.get('/mul/:a/:b',realMulHandler)

app.get('/admin',function(){
    res.json({
        message:`total number of request on the server are : ${totalRequest}`
    })
})

app.listen(3000, () =>{
    console.log("server is running...");
    
})