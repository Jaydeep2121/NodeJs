//object property shorthand

const name = 'jaydeep'
const UsrAge = 23

const user = {
    name,UsrAge,
    location:'surat'
}
console.log(user);

//object destructing
const product = {
    label:'red notebook',
    price:20,
    stock:200,
    salePrice:undefined
}

// const label = product.label;
// const price = product.price;

const {label:prodctlbl,price,rating=5} = product;
// console.log(label); //undefinded
// console.log(prodctlbl);
// console.log(price);
// console.log(rating); //only used when the rating name of property 
                    // not found and it's defined as default at the declaration time

const transaction = (type,{ label,stock }) =>{
    console.log(type,"\n",label,"\n",stock);
}
transaction('order',product);