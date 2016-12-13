"use strict";

var express = require("express");
//var path = require("path");
var month = require("month");
var app = express();

/*
app.set("view engine", "jade");
app.set('views', path.join(__dirname, 'templates'));
*/

app.get('/', (req, res) => {
  res.end("Timestamp microservice. You're welcome!");
});

function setResponse(date) {
  return { "unix" : date.getTime(), "natural" : month(date.getMonth()+1).toString()+" "+date.getDate().toString()+", "+date.getFullYear().toString() };
}

app.get("/:timeData", (req, res) => {
  
  var td  = req.params.timeData;
  var response = { "unix" : null, "natural" : null };
  
  if(!isNaN(Number(td,10))) { // ak je data typu number
  
    let date = new Date(Number(td, 10));
    response = setResponse(date);
    
  } else if(!isNaN((new Date(td)).getDate())) { // ak je to Date
  
      let date = new Date(td);
      response = setResponse(date);
  }
  
  res.header("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(response));
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});

