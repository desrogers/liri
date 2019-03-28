require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var value = process.argv;

switch (action){
case "concert-this":
    concert();
    break;

case "spotify-this-song":
    spotifyThis();
    break;

case "movie-this":
    movieThis();
    break;
}

// concert-this-song
function concert(){
    let artist = value.slice(3).join("%20");
    console.log(artist);

    // use axios to grab data from bands in town
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response){
            // console.log(response.data);

            if (response.data.length <= 0){
                console.log("Uh oh. Bandsintown said "+ value.slice(3).join(" ") + "doesn't have any upcoming shows.")
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
----------------------
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
function spotifyThis(){
    var trackName = value.slice(3).join(" ");
    console.log("Query: " + trackName);

    if (process.argv[3] === undefined){
        spotify.search({type: 'track', query: "The Sign Ace of Base"}, function(err, data) {
            if (err){
                return console.log("Error occured: " + err);
            } else {
    
                var info = data.tracks.items[0];
                // console.log(info);
                
                var artists = info.artists;
                var artistArr = [];
                artists.forEach(function(artist){
                    artistArr.push(artist.name);
                });
        
                artistArr = artistArr.slice(0).join(", ");
                console.log(
`
Track: ${info.name}
Artist(s): ${artistArr}
Album: ${info.album.name}
Preview: ${info.preview_url}
------------------------
`
                );
            } 
        });

    } else {

        spotify.search({type: 'track', query: trackName, limit: 1}, function(err, data) {
            if (err){
                return console.log("Error occured: " + err);
            } else {
    
                var info = data.tracks.items[0];
                // console.log(info);
                
                var artists = info.artists;
                var artistArr = [];
                artists.forEach(function(artist){
                    artistArr.push(artist.name);
                });
        
                artistArr = artistArr.slice(0).join(", ");
        
                console.log("Track: "+info.name);
                console.log("Artist(s): "+ artistArr);
                console.log("Album: "+info.album.name);
                console.log("Preview: "+info.preview_url);
            } 
        });
    } 
}

function movieThis(){
    var queryUrl = "";
    var movieName = value.slice(3).join("+");

    if (value[3] === undefined) {
        queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
    } else {
        queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    }


    axios.get(queryUrl).then(
        function(response) {
            console.log(queryUrl);
            console.log(response.data);
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