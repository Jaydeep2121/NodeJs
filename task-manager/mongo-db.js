//crud

/*
option : 1
    const mongoDB = require('mongodb');
    const MongoClient = mongoDB.MongoClient;
    const objectID = mongoDB.objectID;
option : 2
*/
const { MongoClient,ObjectID, Db } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL,{ useNewUrlParser:true },(error,client)=>{
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    /* 
        ->delete
        db.collection('users').deleteMany({
            age:25
        }).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        })

        db.collection('users').deleteOne({
            age:23
        }).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
    */
    /*
        ->update
        db.collection('users').updateOne({
            _id:new ObjectID('624be5067d5a009c4e2d556c')
        },{
            // $set:{
            //     name:'ramesh'
            // }
            $inc:{
                age:1
            }
        }).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        });

        db.collection('tasks').updateMany({
            completed:false
        },{
            $set:{
                description:'work done!'
            }
        }).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        });
    */
        
    /*
        ->Read
        db.collection('users').findOne({name:'Ravi'},(error,user)=>{
            if (error) {
                return console.log('unable to find');
            }
            console.log(user);
        })
        db.collection('users').findOne({_id:new ObjectID('624be5067d5a009c4e2d556c')},(error,user)=>{
            if (error) {
                return console.log('unable to find');
            }
            console.log(user);
        })
        db.collection('users').find({age:25}).toArray((error,user)=>{
            console.log(user);
        })
        db.collection('users').find({age:23}).count((error,count)=>{
            console.log(count);
        })   
        db.collection('users').findOne({_id:new ObjectID('624be7c8d708fe886553a4eb')},(error,user)=>{
            if (error) {
                return console.log('unable to find');
            }
            console.log(user);
        })  
        db.collection('tasks').find({completed:false}).toArray((error,res)=>{
            if (error) {
                return console.log('Unable to find');
            }
            console.log(res);
        }) 
    */
    /*
        ->create
        db.collection('users').insertOne({
            name:'Jaydeep',
            age:23
        },(error,result)=>{
            if (error) {
                return console.log('Unable to insert user');
            }
            console.log(result.ops);
        });

        db.collection('users').insertMany([
            {
                name:'Ravi',
                age:25
            },{
                name:'Gautam',
                age:21
            }
        ],(error,result)=>{
            if (error) {
                return console.log('Unable to insert user');
            }
            console.log(result.ops);
        })

        db.collection('tasks').insertMany([
            {
                description:'clean room',
                completed:true
            },{
                description:'clean the playground',
                completed:false
            },{
                description:'pot plants',
                completed:false
            }
        ],(error,result)=>{
            if (error) {
                return console.log('Unable to insert task');
            }
            console.log(result.ops);
        })
    */
})