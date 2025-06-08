const express = require('express');
const fs = require('fs');
const { nanoid } = require('nanoid');

const app = express();
const filepath='tododata.json'

if(!fs.existsSync(filepath)){
    fs.writeFileSync(filepath,JSON.stringify([]))
}

app.post('/add/:task', (req,res) =>{
    const task=req.params.task
    if(!task) return res.status(404).send("Task not found")

    const data=JSON.parse(fs.readFileSync(filepath,'utf-8'))

    const newtask={
        id:nanoid(),
        task:task,
    }

    data.push(newtask)
    fs.writeFileSync(filepath,JSON.stringify(data,null,2))

    res.status(202).send(`The task ${newtask.task} with id : ${newtask.id} is added`)
})

app.delete('/del/:id', (req,res) =>{
    const id=req.params.id
    if(!id) return res.status(405).send("ID not found")

    const data=JSON.parse(fs.readFileSync(filepath,'utf-8'))
    const index=data.findIndex(task => task.id === id)

    if(index === -1) return res.send("Task not found")

    const remove=data.splice(index,1)
    fs.writeFileSync(filepath,JSON.stringify(data,null,2))

    res.status(202).send(`Deleted task ${remove[0].task}`)
})

app.put('/update/:id/:updatetask', (req,res) =>{
    const id=req.params.id
    const updatetask=req.params.updatetask

    if(!id || !updatetask) return res.status(405).send("Provide id and task to update")

    const data=JSON.parse(fs.readFileSync(filepath,'utf-8'))
    const task=data.find(task => task.id === id)

    if(!task) return res.status(404).send("Task not found")

    const oldtask=task.task
    task.task=updatetask

    fs.writeFileSync(filepath,JSON.stringify(data,null,2))

    res.status(202).send(`the task from ${oldtask} is upated to ${updatetask}`)


})

app.listen(4000, () => {
    console.log("Server is running ..... ");
    
})