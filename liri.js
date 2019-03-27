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
}

function concert(){
    let artist = value.slice(3).join("%20");
    console.log(artist);

    // use axios to grab data from bands in town
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response){
            console.log(response.data);

            if (response.data.length <= 0){
                console.log("Uh oh. Looks like "+ value.slice(3).join(" ") + " hasn't scheduled any shows. Try another artist.")
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
                    console.log(moment(date).format("MM/DD/YYYY"));
                    console.log(venue.name);
                    console.log(location);
                    console.log("------------------");
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
        
                console.log("Track: "+info.name);
                console.log('--------------');
                console.log("Artist(s): "+ artistArr);
                console.log('--------------');
                console.log("Album: "+info.album.name);
                console.log('--------------');
                console.log("Preview: "+info.preview_url);
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
                console.log('--------------');
                console.log("Artist(s): "+ artistArr);
                console.log('--------------');
                console.log("Album: "+info.album.name);
                console.log('--------------');
                console.log("Preview: "+info.preview_url);
            } 
        });
    } 

        
}