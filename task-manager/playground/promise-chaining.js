require('../src/db/mongoose');
const myuser = require('../src/models/user');

myuser.findByIdAndUpdate('624d5ae403572c22a892e35f',{age:1}).then((user) => {
    console.log(user);
    return myuser.countDocuments({age:1})
}).then((res)=>{
    console.log(res);
}).catch((err) => {
    console.log(err);
});