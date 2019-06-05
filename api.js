/* eslint-disable no-console */
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var logger = require('./logs/logger')

function titleCase(inStr) {
    return inStr.replace(/\w\S*/g, function(tStr) {
		return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
	});
}

exports.concertThis = function(bandName) {
    var band = bandName.split("+").join(" ")
    var bandProperName = titleCase(band)
    
  // use axios to grab data from bands in town
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        bandName +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {

      if (response.data.length <= 0) {
        console.log(
          `Uh oh. Bandsintown said ${bandProperName} doesn't have any upcoming shows.`
        );
      } else {
        console.log(`
Band: ${bandProperName}
---------------------`)
        for (var i = 0; i < response.data.length; i++) {
          var venue = response.data[i].venue;
          var date = response.data[i].datetime;
          var location;
          if (venue.region === "") {
            location = venue.city + ", " + venue.country;
          } else {
            location = venue.city + ", " + venue.region + ", " + venue.country;
          }

          var concertData = `
Date: ${moment(date).format("MM/DD/YYYY")}
Location: ${venue.name}, ${location}`;

          console.log(concertData);
          logger(concertData);
        }
      }
    })
    .catch(function(error) {
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
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

exports.movieThis = function(movieTitle) {
    var queryUrl =
      "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
  
    axios.get(queryUrl).then(function(response) {
      console.log(`
Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.Ratings[0].Value}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Director: ${response.data.Director}
Country: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Cast: ${response.data.Actors}`
      );
    });
  };

exports.spotifyThis = function(trackName){
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
            
            var spotifyData =`
Track: ${info.name}
Artist(s): ${artistArr}
Album: ${info.album.name}
Preview: ${info.preview_url}`;

            console.log(spotifyData);
            logger(spotifyData);
        }
    });
}
  