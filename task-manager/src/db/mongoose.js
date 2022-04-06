const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify :false
})
    // user model
// const me = new user({
//     name:'  ketan     ',
//     email:'AH23@GMAIL.COM  ',
//     age:12,
//     password:'akash233'
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((err) => {
//     console.log('Error!',err);
// });

        //task model
    // const Task=new task({
    //     description:'clean the black-board'
    // })

    // Task.save().then(() => {
    //     console.log(Task);
    // }).catch((err) => {
    //     console.log(err);
    // });


