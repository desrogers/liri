require("dotenv").config();

// VARIABLES
// --------------------------------
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var input = process.argv.slice(3).join("+");


// FUNCTIONS
// ---------------------------------
// concert-this-song
function concertThis(bandName){

    // use axios to grab data from bands in town
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
        .then(function(response){
            // console.log(response.data);

            if (response.data.length <= 0){
                console.log("Uh oh. Bandsintown said "+ process.argv.slice(3).join(" ") + "doesn't have any upcoming shows.")
            } else {

                for (var i = 0; i < response.data.length; i++) {
                    var venue = response.data[i].venue;
                    var date = response.data[i].datetime;
                    var location;
                    if (venue.region === ""){
                        location = venue.city + ", " + venue.country;
                    } else {
                        location = venue.city + ", " + venue.region + ", " + venue.country;
                    }
                    console.log(
`
Date: ${moment(date).format("MM/DD/YYYY")}
Venue: ${venue.name}
Location: ${location}
`
                    );
                }
            }
        })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
}

// spotify-this-song
function spotifyThis(trackName){

    spotify.search({ type: "track", query: trackName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        } else {

            var info = data.tracks.items[0];
            var artists = info.artists;
            var artistArr = [];

            artists.forEach(function (artist) {
                artistArr.push(artist.name);
            });

            artistArr = artistArr.slice(0).join(", ");
            
            console.log(
`
Track: ${info.name}
Artist(s): ${artistArr}
Album: ${info.album.name}
Preview: ${info.preview_url}
`
            );
        }
    });
}

// movie-this
function movieThis(movieTitle){
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
            console.log(
`
Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.Ratings[0].Value}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Country: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Cast: ${response.data.Actors}
`
          );
        }
    );

}

// do-what-it-says
function doWhat(){
    fs.readFile("random.txt", "utf8", function(error, data){
        var dataArr = data.split(",");
        var action = dataArr[0];
        var input = dataArr[1];

        console.log(`Action: ${action}, Input: ${input}`)

        switch (action){
            case "concert-this":
                concert(input);
                break;
            
            case "spotify-this-song":
                spotifyThis(input);
                break;
            
            case "movie-this":
                movieThis(input);
                break;
        }
    });
}

// MAIN PROGRAM
// --------------------------------
switch (action){
case "concert-this":
    concertThis(input);
break;

case "spotify-this-song":
    if (input === "") {
        spotifyThis("The Sign Ace Base");
    } else {
        spotifyThis(input);
    }
    break;

case "movie-this":
    if (input === ""){
        movieThis("Mr. Nobody");
    } else {
        movieThis(input);
    }
    break;

case "do-what-it-says":
    doWhat(input);
    break;
}
