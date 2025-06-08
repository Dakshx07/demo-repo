const express=require('express')
const jwt=require('jsonwebtoken')

const app=express()

const JWT_SECRET='daksh7776261726576'

const users=[]

app.use(express.json())

app.post('/signup',(req,res) => {
    const username=req.body.username
    const password=req.body.password

    if(users.find(u => u.username == username)){
        res.json({
            messgae:"You are already signed up"
        })
        return
    }

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"You are signed up "
    })

    console.log(users);
    
})

app.post('/signin',(req,res) => {
     const username=req.body.username
    const password=req.body.password

    const user=users.find(function(u){
        if(u.username == username && u.password == password){
            return true
        }else{
            return false
        }
    })

    if(user){
        const token=jwt.sign({
            username:username
        },JWT_SECRET)

        res.json({
            message:token
        })
    }else{
        res.status(401).send({
            message:"Invalid username or password"
        })
    }

    console.log(username);
    
})

app.listen(3002, ( ) => {
    console.log("Server is running...");
})