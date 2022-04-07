require('../src/db/mongoose');
const mytask = require('../src/models/task');

//also delete with findByIdAndDelete()
// mytask.deleteOne({_id:'624d8dcf71e1112d94ace9ec'}).then((task) => {
//     console.log(task);
//     return mytask.countDocuments({completed:false})
// }).then((res)=>{
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

const deleteTask = async (id) => {
    const task=await mytask.findByIdAndDelete(id);
    const cnt=await mytask.countDocuments({completed:false});
    return cnt;    
}
deleteTask('624e854d34f3ec367f74646e').then((result) => {
    console.log('count :',result);
}).catch((err) => {
    console.log(err);
});