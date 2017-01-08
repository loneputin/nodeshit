const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db; //database connection

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.	
});

app.get('/getQuotes', function (req,res) {
  // We want to set the content-type header so that the browser understands
  //  the content of the response.
 res.contentType('application/json');

//dont forget to stringify when sending an json object.

	res.send("{name: 'sam', quote: 'hey there sonny.'}") ;
});


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  });
});


//Connect to database first! then start the server.
MongoClient.connect('mongodb://sam:Example1!@ds157258.mlab.com:57258/dog-walks', function (err, database) {
  if (err) return console.log(err)

  db = database
  var port = process.env.PORT || 8000
  app.listen(port, function() {
      console.log("App is running on port " + port);
  });

});