const express=require('express')
const fs=require('fs')
const {nanoid} =require('nanoid')

const app=express()

//middleware
app.use(express.json())

const filepath='op.json'

if(!fs.existsSync(filepath)){
    fs.writeFileSync(filepath,JSON.stringify([]))
}

function readTask(){
    return JSON.parse(fs.readFileSync(filepath,'utf-8'))
}

function saveTask(data){
    fs.writeFileSync(filepath,JSON.stringify(data,null,2))
}

app.post('/add/:task' ,(req,res) => {
    try{
        const task=req.params.task
        if(!task) return res.status(404).send("task not found")

        const data=readTask()
        const newtask={id:nanoid(),task:task}
        data.push(newtask)
        saveTask(data)

        res.status(201).send(`Task ${newtask.task} with id : ${newtask.id} is added`)
    }catch(err){
        res.status(505).send("Server error while adding task")
    }

})

app.delete('/del/:id' ,(req,res) => {
    try{
        const {id}=req.params
        const data=readTask()
        const index=data.findIndex(task => task.id === id)

        if(index === -1) return res.status(400).send("❌ Task not found")

        const remove=data.splice(index,1)
        saveTask(data)

        res.status(201).send(`Delted Task ${remove[0].task}`)

    }catch(err){
        res.status(505).send("Server error while deleting task")
    }
})

app.put('/update/:id/:updatedTask' ,(req,res) => {
    try{
    const id = req.params.id
    const updatedTask=req.params.updatedTask
    if(!updatedTask) return res.status(404).send("Task not found")

    const data=readTask()
    const task = data.find(task => task.id === id);

    if (!task) return res.status(404).send("❌ Task not found");

    const oldtask=task.task
    task.task=updatedTask 
    saveTask(data)

     res.send(`📝 Updated: "${oldtask}" ➝ "${updatedTask}"`);
    }catch (err){
         res.status(505).send("Server error while updating task")
    }
})

app.get('/', (req,res) => {
    try{
        const data=readTask()
        res.send(data)
    }catch(err){
        res.status(505).send("Server error while fetching task")
    }
})

app.listen(2000, ( ) => {
    console.log('🚀 Server running at http://localhost:2000');
})