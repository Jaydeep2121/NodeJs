const express = require('express');
require('./db/mongoose');
const MyUser = require('./models/user');
const MyTask = require('./models/task');

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json()); //use app.use used to send the request in json format
//for save data
app.post('/users',(req,res)=>{
    const user = new MyUser(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err)
    });
})
app.post('/tasks',(req,res)=>{
    const task = new MyTask(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    });
})
//for getting data
app.get('/users',(req,res)=>{
    MyUser.find({}).then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(500).send();
    });
})
app.get('/users/:id',(req,res)=>{
  const _id=req.params.id;
  MyUser.findById(_id).then((result) => {
      if (!result) {    
            return res.status(404).send();          
      }
      res.send(result);
  }).catch((err) => {
      res.status(500).send();
  });  
})
app.get('/tasks',(req,res)=>{
    MyTask.find({}).then((task) => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(500).send();
    });
})
app.get('/tasks/:id',(req,res)=>{
    const _id=req.params.id;
    MyTask.findById(_id).then((result) => {
        if (!result) {    
              return res.status(404).send();          
        }
        res.send(result);
    }).catch((err) => {
        res.status(500).send();
    });  
  })
app.listen(port,()=>{
    console.log('server is up on port',port);
})