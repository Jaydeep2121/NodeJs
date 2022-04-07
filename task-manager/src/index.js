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