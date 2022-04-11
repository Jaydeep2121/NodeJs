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

const Task = require('./models/task')
const user = require('./models/user')
const main = async ()=>{
    const task = await Task.findById('62516d9cf5469f1974092501')
    await task.populate('owner').execPopulate()
    console.log(task.owner); //found the user

    const users = await user.findById('62516a2ab5e56d1e08d7ccb7')
    await users.populate('tasks').execPopulate()
    console.log(users.tasks)
}
main()

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
