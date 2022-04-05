const mongoose = require('mongoose');
const validator = require('validator');
// import validator from 'validator';

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

const user = mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },  
    age:{
        type:Number,
        validate(value){
            if (value<0) {
                throw new Error("Age must be a positive number");
            }
        }
    }
})
const me = new user({
    name:'ketan',
    email:'ahsn',
    age:-2
})

me.save().then(() => {
    console.log(me);
}).catch((err) => {
    console.log('Error!',err);
});

/*
    const task = mongoose.model('Task',{
        description:{
            type:String
        },  
        completed:{
            type:Boolean
        }
    })
    const Task=new task({
        description:'clean the black-board',
        completed:false
    })

    Task.save().then(() => {
        console.log(Task);
    }).catch((err) => {
        console.log(err);
    });
*/

