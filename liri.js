require("dotenv").config();

const keys = require(".keys.js");
const spotify = new Spotify(keys.spotify);
const action = process.argv[2];
const value = process.argv[3];




