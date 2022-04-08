const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json()); //use app.use used to send the request in json format
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log('server is up on port',port);
})

/*
    const bcrypt = require('bcryptjs');
    const MyFunction = async () =>{
        const pass = 'Rahul267@!#';
        const hasPass = await bcrypt.hash(pass,8);
        console.log('pass  :',pass);
        console.log('hashed:',hasPass);

        const isMatch = await bcrypt.compare('Rahul267@!#',hasPass);
        console.log(isMatch);
    }
    MyFunction();

    const jwt = require('jsonwebtoken')
    const MyFunction = async () =>{
        const token = await jwt.sign({_id:'xyz678'},'thisisdemo',{expiresIn:'2 days'})
        console.log(token);

        const data = await jwt.verify(token,'thisisdemo')
        console.log(data);
    }
    console.log(MyFunction())
*/