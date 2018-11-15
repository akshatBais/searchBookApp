const express = require('express');
const axios = require("axios");
const cors = require("cors");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var request = require('sync-request');
import config from './config';

const server = express();

server.listen(config.port,  () => {
  console.log("Express listening on port : ", config.port);
});


console.log("server is on and listening on port 3001");

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use('/getDetails',(req,res)=> {
  console.log("getting info about one book");
  console.log(req.query.q);
  let result2 = '';
  var respo = request('GET', 'https://www.goodreads.com/book/show/'+req.query.q+'.xml?key=LsvXe6tyOcFzGePEMDiw');
console.log(respo);
  parser.parseString(respo.getBody().toString(), function(err, result) {
        console.log(result);
       result2 = result.GoodreadsResponse.book[0];
       res.send(result);
     });

});

server.get('/getBooks', (req,res)=> {
  console.log("getting all the books");
  console.log(req.query.q);
  let result2 = '';
  var resp = request('GET', 'https://www.goodreads.com/search/index.xml?key=LsvXe6tyOcFzGePEMDiw&q='+ req.query.q);
  console.log(resp.getBody().toString());
  parser.parseString(resp.getBody().toString(), function(err, result) {
       console.log(result.GoodreadsResponse.search[0].results[0]);
       result2 = result.GoodreadsResponse.search[0].results[0];
       res.send(result.GoodreadsResponse.search[0].results[0].work);
     });

});
