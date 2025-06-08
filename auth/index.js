const express=require('express')
const jwt=require('jsonwebtoken')

const JWT_SECRET='daksh7776261726576'

const app=express()

app.use(express.json())

const users=[]

function generateToken(){
     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


     let token=""
     for(let i=0;i<32;i++){
        token+=options[Math.floor(Math.random()* options.length)]
     }
     return token;
}

app.post('/signup',(req,res) => {
    const username=req.body.username
    const password=req.body.password

    if(users.find(u => u.username === username)){
        res.json({
            message:"You are already signed up"
        })
        return 

    }

    users.push({
        username:username,
        password:password
    })
    res.json({
        messahe:"You are signed up "
    })

    console.log(users);
    
})

app.post('/signin',(req,res) => {
    const username=req.body.username
    const password=req.body.password

    const user=users.find(function(u){
        if(u.username == username && u.password ==password){
            return true;
        }else{
            return false;
        }
    })

    if(user){
        const token=jwt.sign({
            username: username
        },JWT_SECRET)      //converting username into jwt 
        // user.token=token
        res.json({
            message:token
        })
    }else{
        res.status(403).send({
            message:"Invalid username or password"
        })
    }

     console.log(users);
})

app.get('/me',(req,res) =>{
    const token=req.header('token')
    const decodeInformation=jwt.verify(token, JWT_SECRET)
    const username=decodeInformation.username
    let user=users.find(user => user.username == username)

    if(user){
        res.json({
            username:user.username,
            password:user.password
        })
    }else{
        res.status(401).send({
            message:"Unauthorized"
        })
    }
})

app.listen(3001,() => {
    console.log("server is running....");
    
})