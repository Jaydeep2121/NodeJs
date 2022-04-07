require('../src/db/mongoose');
const myuser = require('../src/models/user');

// myuser.findByIdAndUpdate('624d5ae403572c22a892e35f',{age:1}).then((user) => {
//     console.log(user);
//     return myuser.countDocuments({age:1})
// }).then((res)=>{
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });


const updateAgeAndCount = async (id,age) => {
    const usr=await myuser.findByIdAndUpdate(id,{age});
    const cnt=await myuser.countDocuments({age:2})
    return cnt;
}
updateAgeAndCount('624d5ae403572c22a892e35f',2).then((MyCount) => {
    console.log('result :',MyCount);
}).catch((err) => {
    console.log(err);
});