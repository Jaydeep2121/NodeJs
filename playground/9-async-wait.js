const add = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if (a<0 || b<0) {
                return reject('number must be positive');
            }
            resolve(a+b);
        }, 2000);
    })
}
const doWork = async () =>{                  //async returns Promise
        const sum = await add(6,5);              // await used and easier than promise chaining
        const sum1 = await add(sum,8);           // get promise and return promise
        const sum2 = await add(sum1,10); // await take 2 sec for each execution so it's 
        return sum2;                    // take total 6 sec to complete task
    // return await add(await add(await add(await add(6,5),8),10),6) //more complex way to done/
}
doWork().then((result) => {
    console.log('res:',result);
}).catch((err) => {
    console.log('e',err);
});