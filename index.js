const express=require('express')
const fs= require('fs')
const { nanoid }=require('nanoid')
const { join } = require('path')

const app=express()
const filepath='data.json'

if(!fs.existsSync(filepath)){
    fs.writeSync(filepath,JSON.stringify([]))
}


app.post('/add/:tasktext', (req,res) => {
    const tasktext=req.params.tasktext
    if(!tasktext) return res.status(404).send("tasktext not found")

    const data=JSON.parse(fs.readFileSync(filepath,'utf-8'))
    const newtask={
        id:nanoid(),
        task:tasktext,
    }

    data.push(newtask)
    fs.writeFileSync(filepath,JSON.stringify(data,null,2))

    res.status(201).send(`new task with id : ${newtask.id} ->  ${newtask.task} has been added `)
})

app.delete('/del/:id', (req,res) => {
    const id=req.params.id
    if(!id) return res.status(404).send("id not found")

    const data=JSON.parse(fs.readFileSync(filepath,'utf-8'))
    const index=data.findIndex(task => task.id === id)

    if(index === -1) return res.send("task not found")
    
    const remove=data.splice(index,1)
    fs.writeFileSync(filepath,JSON.stringify(data,null,2))

    res.status(201).send(`Deleted Task ${remove[0].task}`)
})

app.put('/update/:id/:updatedTask', (req,res) => {
    const id=req.params.id
    const updatedTask=req.params.updatedTask

    if(!id || !updatedTask) return res.status(404).send("Please provide both id and task to update")
    
    const data=JSON.parse(fs.readFileSync(filepath,'utf-8'))
    const task=data.find(task => task.id === id)

    if(!task) return res.send("task not found")

    const oldtask=task.task
    task.task=updatedTask

    fs.writeFileSync(filepath,JSON.stringify(data,null,2))

    res.status(201).send(`task is updated from ${oldtask} to ${updatedTask}`)
})

app.listen(3002, () => {
    console.log("Server is running smoothly.....");
    
})