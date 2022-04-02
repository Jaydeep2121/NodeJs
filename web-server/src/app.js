const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs');

//define path for express config
const DirPath=path.join(__dirname , '../public');
const viewPath=path.join(__dirname , '../templates/views');
const parPath=path.join(__dirname,'../templates/partials');

//setup handlebar engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(parPath);

//setup static directory to serve
app.use(express.static(DirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ghanshyam'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Title',
        name:'Andrew'
    })
})

/*
    app.get('/help',(req,res)=>{
        res.send([
            {
                name:'jaydeep',
            },
            {
                name:'ravi',
            }
        ]);
    })
    app.get('/about',(req,res)=>{
        res.send('about page');
    })
*/
app.get('/help',(req,res)=>{
    res.render('about',{
        title:'Help Title',
        name:'Andrew help'
    })
})
app.get('/product',(req,res)=>{
    if (!req.query.type) {
        res.send({
            error:'you must provide search term'
        })
    }
    console.log(req.query.type);
    res.send({
        products:[]
    });
})
app.get('/help/*',(req,res)=>{
    res.send('404-Help Articles/Not Found');
})
app.get('*',(req,res)=>{
    res.send('404-Not Found');
})
app.listen(3000,()=>{
    console.log('server is up on the portno 3000');
})