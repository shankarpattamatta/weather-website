const request = require('request');
//Given the co-odinates write a call back function to derive its co-ordinates using the MAPBOX api.

const getGeoCode = function(location,callback){

    const mapboxURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1Ijoic2hhbmthcnBhdHRhbWF0dGEiLCJhIjoiY2szbnhta255MHFoejNvbW40djlqZm0zMiJ9.r8oE7jcxGYcC0XW7Dei53A&limit=1';
    const getLocationData = request({url:mapboxURL,json:true},function(error,response){

        if(error){
            callback('Unable to connect to the location services!!',undefined)
        }
        else if(response.body.features.length===0) {
            callback('Unable to find the location ,please use another location',undefined);
        }
        else
        {
            callback(undefined,{
             latitude: response.body.features[0].center[1],
             longitude: response.body.features[0].center[0],
             location:  response.body.features[0].place_name
            });

        }
      })
    
};

const getForecast = function(longitude,latitude,callback){
    const darkSkyURL= 'https://api.darksky.net/forecast/218a31d49926b6891de3b2271e9c2556/'+latitude+','+longitude+'?units=si';
   
    const getForecastData = request({url:darkSkyURL,json:true},function(error,response){
        if(error)
        {
            callback('Unable to connect to the darkSkyService!',undefined);
        }
        else if(response.body.error){
            callback('unable to get the forecast details for the current co-ordinates!',undefined);
        }
        else{
            callback(undefined,'It is currently '+response.body.currently.temperature+' C outside.Also, there is a '+response.body.currently.precipProbability+' chance of rain.');
        }
    });


};
   
module.exports={getGeoCode,getForecast};