# LIRI
Based on user input this Nodejs app will search Spotify for songs, Bands in Town for a band's concerts, and OMDB for movies. Then it will log the result in the terminal console and add it to log.txt.

## Structure
```
.
├── README.md
├── api.js
├── do-this.js
├── keys.js
├── liri.js
├── liri.js
├── log.txt
├── logger.js
├── package-lock.json
├── package.json
└── random.txt
```

## How to Get Up and Running
You can use the LIRI app by following these steps:

1. Clone the repository into your local dev environment.
2. Install dependencies
```sh
npm install
```

## Usage
Request the info your looking for with a single command:
```sh
node liri [concert-this | movie-this | spotify-this | do-what-it-says] query
```
- concert-this: search the Bands in Town API to get a list of a band's tour dates and locations.
- movie-this: search the OMDB API to get the requested movie's plot, cast, ratings and more.
- spotify-this: search the Spotify to get the information on any song.
- do-what-it-says: doesn't take an input; this action does what the text says in random.txt.

## [Demo](https://drive.google.com/file/d/1BpBmcQp5zGcKZ1d2F4hRHvdDB61se7zp/view?usp=sharing)