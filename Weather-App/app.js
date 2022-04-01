/*
    const request = require('request');
    const url="https://api.weatherapi.com/v1/forecast.json?key=289a1d3a72f149409d551338221403&q=surat&days=1&aqi=no&alerts=no"

    //json:truer automatically parse the request
    request({ url:url,json:true },(error,response) => {
        console.log(response.body.forecast.forecastday[0].day);
    })

    
    const request = require("request");
    const geoLocUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamF5ZGlwYSIsImEiOiJjbDFmMGl6Y2EwdjdzM2twYzY4aTRlajYyIn0.txprTUqPlfJMd3OlXKQAUw";

    request({url:geoLocUrl,json:true},(error,response) => {
        if(error){
            console.log("Unable to connect whether service");
        }else if(response.body.message){
            console.log("Unable to find location");
        }else{
            const lati = response.body.features[0].center[1];
            const long = response.body.features[0].center[0];
            console.log("latitude : " + lati ,"longitude :"+long);
        }
    })

    const getMyData = require('./utils/module');
    getMyData(
        'New York',(error,data) => 
        (data && error===undefined)?console.log("Data :",data):console.log("Error:",error))
*/
const getMyData = require('./utils/module');
const forecast = require('./utils/forecast');
getMyData('Bostan',(error,data) => {
        if (error) {
            return console.log(error);
        }
        console.log("Data :",data)
        forecast(data.lati,data.long,(error,fdata)=>{
            if (error) {
                return console.log(error);
            }
            console.log(data.location);
            console.log('Data',fdata);
        })
}) 
