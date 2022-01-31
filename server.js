/* eslint-disable no-undef */


const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const movieData = require('./MovieData/data.json');


app.get('/',movieInfoHandler);
app.get('/favorite',favHandler);
app.get('*',notFoundHandler);


function Movie (title,poster_path,overview){
  this.title = title;
  this.posterPath = poster_path;
  this.overview = overview;

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

app.listen(3000,() => {
  console.log('listening to 3000');


});
