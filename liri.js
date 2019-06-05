/* eslint-disable no-console */
// MODULES
// --------------------------------
require("dotenv").config();
var API = require('./api')
var doThis = require('./do-this')

// VARIABLES
// --------------------------------
var action = process.argv[2];
var input = process.argv.slice(3).join("+");

// MAIN PROGRAM
// --------------------------------
switch (action){
case "concert-this":
    API.concertThis(input);
break;

case "spotify-this":
    if (input === "") {
        API.spotifyThis("The Sign Ace Base");
    } else {
        API.spotifyThis(input);
    }
    break;

case "movie-this":
    if (input === ""){
        API.movieThis("Mr. Nobody");
    } else {
        API.movieThis(input);
    }
    break;

case "do-what-it-says":
    doThis(input);
    break;

default:
            console.log(`
    Oops :(
      
      Something went wrong. Please verify that the action and input have the correct format:
    
    node liri [spotify-this | concert-this | movie-this] Query 
            `)
}
