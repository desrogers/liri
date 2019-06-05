/* eslint-disable no-console */
var fs = require("fs");

module.exports = function(input){
    fs.appendFile("./logs/results.log", input, function(err){
        if (err){
           return console.log(err);
        }
    })
}