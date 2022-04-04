const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs');
const getMyData = require('./utils/module');
const forecast = require('./utils/forecast');

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
app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:'you must provide address'
        })
    }
    getMyData(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error) {
                return res.send(error)                
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'its raining',
    //     location:'philadelphia',
    //     address:req.query.address
    // })
})
app.get('/product',(req,res)=>{
    if (!req.query.search && !req.query.rating) {
        return res.send({
            error:'you must provide search term and rating'
        })
    }
    res.send({
        products:{
            search:req.query.search,
            rating:req.query.rating
        }
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