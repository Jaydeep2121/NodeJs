console.log("file is loaded");
//browser http request with fetch
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e);
})