/*
setTimeout(() => {
    console.log("Two sec are up");
}, 2000);

const names = ['jaydeep','jay','ravi'];
const shortName = names.filter((name)=>{
    return name.length <= 4
})

const geocode = (address,Mycallback) => {
    setTimeout(() => {
        const data = {
            lati:0,
            long:0
        }
        // return data; //undefined
        Mycallback(data);
    }, 2000);
}
geocode('Philadephia',(Mydata)=>{
    console.log(Mydata);
});

*/

const add = (a,b,add) => {
    setTimeout(() => {
        add(a+b);
    }, 2000);
}

add(1,4,(sum)=>{
    console.log("the sum is:",sum);    
})


