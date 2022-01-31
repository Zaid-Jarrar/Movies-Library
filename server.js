/* eslint-disable no-undef */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const app = express();
const { default: axios } = require('axios'); // used to send requests to other APIs and get the data from

app.use(cors());

const movieData = require('./MovieData/data.json');


app.get('/',movieInfoHandler);
app.get('/favorite',favHandler);
app.get('/trending',trendingHandler);
app.get('/search',searchHandler);
app.get('/genre',genreHandler);
app.get('/region',regionHandler);
app.get('*',notFoundHandler); // error from the client
app.use(errorHandler);// error from the server500

const url =`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.APIKEY}`;

let urlSearchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=Spider-Man&page=1-2&include_adult=false&year=2022`;
let urlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.APIKEY}&language=en-US`;
let urlRegion = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${process.env.APIKEY}&language=en-US`;


function Movie(title,poster_path,overview){
  this.title = title;
  this.posterPath = poster_path;
  this.overview = overview;

}
function Trending (id,title,release_date,poster_path,overview){
  this.id = id;
  this.title = title;
  this.releaseDate = release_date;
  this.posterPath = poster_path;
  this.overview = overview;

}

function Genre(id,name){
  this.id = id;
  this.name = name;

}


function Search (id,title,release_date,poster_path,overview){
  this.id = id;
  this.title = title;
  this.releaseDate = release_date;
  this.posterPath = poster_path;
  this.overview = overview;

}


function Region(iso_3166_1,english_name,native_name){
  this.iso_3166_1 = iso_3166_1;
  this.english_name = english_name;
  this.native_name = native_name;
}


function errorHandler(err, req, res) {
  const errorr = {
    status: 500,
    message: 'error',
  };
  res.status(500).send(errorr);
}


function regionHandler(req,res){
  axios.get(urlRegion)
    .then((result)=>{
      // console.log(result.data.genres);
      let movieRegion = result.data.results.map(movie =>{
        return new Region(movie.iso_3166_1,movie.english_name,movie.native_name);
      });
      res.status(200).json(movieRegion);

    }).catch((err) =>{
      errorHandler(err, req, res);

    });
}



function genreHandler(req,res){
  axios.get(urlGenre)
    .then((result)=>{
      // console.log(result.data.genres);
      let movieGenre = result.data.genres.map(movie =>{
        return new Genre(movie.id,movie.name);
      });
      res.status(200).json(movieGenre);

    }).catch((err) =>{
      errorHandler(err, req, res);

    });
}







function searchHandler(req,res){
  axios.get(urlSearchMovie)
    .then((result)=>{
      // console.log(result.data.results);
      let movieSearch = result.data.results.map(movie =>{
        return new Search(movie.id,movie.title,movie.release_date,movie.poster_path,movie.overview);
      });
      res.status(200).json(movieSearch);

    }).catch((err) =>{
      errorHandler(err, req, res);

    });
}


function trendingHandler(req,res){
  axios.get(url)
    .then((result)=>{
      // console.log(result.data.results);
      let movieTrend = result.data.results.map(movie =>{
        return new Trending(movie.id,movie.title,movie.release_date,movie.poster_path,movie.overview);
      });
      res.status(200).json(movieTrend);

    }).catch((err) =>{
      errorHandler(err, req, res);

    });
}







function movieInfoHandler(req,res){
  let moviearray = [];
  movieData.data.forEach(movie => {
    let oneMovie = new Movie (movie.title,movie.poster_path,
      movie.overview);
    moviearray.push(oneMovie);

  });
  return res.status(200).json(moviearray);
}

function favHandler(req,res){
  return res.status(200).send('Welcome to Favorite Page');
}

function notFoundHandler(req,res){
  return res.status(404).send('Sorry, something went wrong');
}

app.listen(PORT,() => {
  console.log(`listening to port ${PORT}`);


});
