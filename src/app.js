//express is a javascript function 
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const location = require('./utils.js');

//when you invoke that function it gives you an object
const app = express();
const port=process.env.PORT || 3000;
//This object will deliver multiple methods .one of those methods is get which is useful to route the webrequest to a paricular web page
//Takes in the route and a function as arguments

console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname),'../public'); //refers to public folder

//Define paths for express config -- __dirname corresponds to the current file's directory
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
//set allows you to set a value for the express function

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

console.log('The public directory is'+publicDir)
app.use(express.static(publicDir));

app.get('/weather',function(req,res){
    if(!req.query.address)
    {
       return  res.send({'Error':'No Address Information provided'});
    }
    location.getGeoCode(req.query.address,function(error,gecodeResponse){
        if(error){
            return res.send({'Error:':error});
        }
        else
        {
            //call the get Forecast function 
            location.getForecast(gecodeResponse.longitude,gecodeResponse.latitude,function(error,forecastResponse){
                if(error){
                    return res.error;
                }
                else{
                        res.send({
                            'Gecocode Details':gecodeResponse,
                            'Forecaset Details':forecastResponse
                        });
                }
            });
        }
    })
});

app.get('',function(req,res){
    
    res.render('index',{
        title:'Weather',
        name: 'Umashankar'
    })
});
app.get('/about',function(req,res){
    res.render('about',{
        title:'About me',
        name:'umashankar'
    })
});
app.get('/products',function(req,res){
    //run only if there's no search term
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({products:['product1','product2','product3']});
});
app.get('/home',function(req,res){
    res.render('home',{
         title:'home page',
         name:'umashankar'  
    });
});
app.get('/help',function(req,res){
    res.render('help',{
        title:'help page',
        message:'Helllo Viewer , Here is how use the weather app!!',
        name:'umashankar'
    })
});

app.get('',function(req,res){
res.send('Hello Express!')
});

// app.get('/Home',function(req,res){
// res.send('<h1> Home page </h1>');
// });

// app.get('/About',function(req,res){
//     res.send('This is the about page!');

// });

app.get('/weather',function(req,res){
    res.send('You weather is perfect!');

});
app.get('/help/*',function(req,res)
{
    res.render('missinghelparticle',{
        title:'Help page',
        name:'umashankar'
        });
});
app.get('*',function(req,res){
    res.render('custom HTTP 404',{
        title:'HTTP 404 page',
        name:'Umashankar'
    });
});
app.listen(port,function(){
    console.log('server is up on port'+ port+'!');
});