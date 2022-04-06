// const doWorkPromise = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         // resolve([7,4,6]);
//         reject('things went wrong!')
//     }, 2000);
// })
// doWorkPromise.then((result)=>{
//     console.log('success',result);
// }).catch((error)=>{
//     console.log('Error!',error);
// })

//promise chaining
const add = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(a+b);
        }, 2000);
    })
}
/*    
    add(1,2).then((sum) => {
        console.log('sum 1:',sum);
        add(sum,5).then((sum2) => {
            console.log('sum 2:',sum2);
        }).catch((err) => {
            console.log('Inner Error!',err);
        });
    }).catch((err) => {
        console.log('Error!',err);
    });
*/

add(1,1).then((sum) => {
    console.log('sum 1:',sum);
    return add(sum,4);
}).then((sum2)=>{
    console.log('sum 2:',sum2);
}).catch((err) => {
   console.log('Error!',err); 
});
