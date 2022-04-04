const request = require("request");
const GeoCode = (address,Mycallback) => {
    const geoLocUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiamF5ZGlwYSIsImEiOiJjbDFmMGl6Y2EwdjdzM2twYzY4aTRlajYyIn0.txprTUqPlfJMd3OlXKQAUw";
    request({url:geoLocUrl,json:true},(error,response) => {
        if(error){
            Mycallback("Unable to connect whether service");
        }else if(response.body.message){
            Mycallback("Unable to find location");
        }else{
            Mycallback(undefined,{
                lati : response.body.features[0].center[1],
                long : response.body.features[0].center[0],
                loca : response.body.features[0].place_name
            })
        }
    })
}
module.exports = GeoCode;