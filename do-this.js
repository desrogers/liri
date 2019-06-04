// MODULES
// --------------------------------
var fs = require('fs');
var API = require('./api')

module.exports = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    var dataArr = data.split(",");
    var action = dataArr[0];
    var input = dataArr[1];

    switch (action) {
      case "concert-this":
        API.concertThis(input);
        break;

      case "spotify-this":
        API.spotifyThis(input);
        break;

      case "movie-this":
        API.movieThis(input);
        break;
      default:
        console.log(`
Oops :(
  
  Something went wrong. Please check 'random.txt' and verify that the action and input have the correct format:

[spotify-this | concert-this | movie-this],Query 
        `)
    }
  });
};
