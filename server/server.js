const path = require('path');
const express = require('express');

const app = express(); //create express app
const publicPath = path.join(__dirname, '..', 'public');


app.use(express.static(publicPath));//tell the app to use the public dir to serve up all our static assets

//this is to handle the sub url inside our public folder, i.e create url 
 //if what the person requested is in public folder, the index.html will serve up the request, it s the same as historyApiFallback: true option of dev-server 
app.get('*',(request,response)=>{
    response.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 3000;
//app will listen in port 3000 could be fix for local machine, but no for Heroku we need an env variable
app.listen(port, ()=>{

    console.log('SERVER IS UP');

});
