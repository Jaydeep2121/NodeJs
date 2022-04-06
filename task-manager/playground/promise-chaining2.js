require('../src/db/mongoose');
const mytask = require('../src/models/task');

//also delete with findByIdAndDelete()
mytask.deleteOne({_id:'624d8dcf71e1112d94ace9ec'}).then((task) => {
    console.log(task);
    return mytask.countDocuments({completed:false})
}).then((res)=>{
    console.log(res);
}).catch((err) => {
    console.log(err);
});