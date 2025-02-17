require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser= require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

var short_url=0
var urlsArray= {}

function stringIsAValidUrl(url) {

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

app.post('/api/shorturl', function(req, res) {
  const originalURL= req.body.url
  short_url++
  urlsArray[short_url]= originalURL
  res.json({ "original_url" : originalURL, "short_url" : short_url});
});

app.get('/api/shorturl/:short_url', function(req, res) {
     const short_url= req.params.short_url
     if(stringIsAValidUrl(urlsArray[short_url])){
       res.redirect(urlsArray[short_url])
     }else{
      res.json({error: 'invalid url'})
     } 
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
