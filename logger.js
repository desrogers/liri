var fs = require("fs");

module.exports = function(input){
    fs.appendFile("log.txt", input, function(err){
        if (err){
           return console.log(err);
        }
    })
}