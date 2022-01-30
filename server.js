/* eslint-disable no-undef */


const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const movieData = require('./MovieData/data.json');


app.get('/',movieInfoHandler);
app.get('/favorite',favHandler);
app.get('*',notFoundHandler);


function Movie (title,poster_path,vote_average,overview,release_date){
  this.title = title;
  this.posterPath = poster_path;
  this.vote_average = vote_average;
  this.release_date = release_date;
  this.overview = overview;

}
function movieInfoHandler(req,res){
  let moviearray = [];
  movieData.data.forEach(movie => {
    let oneMovie = new Movie (movie.title,movie.poster_path,movie.vote_average,
      movie.overview,movie.release_date);
    moviearray.push(oneMovie);

  });
  return res.status(200).json(moviearray);
}

function favHandler(req,res){
  return res.status(200).send('Best of the Best List');
}

function notFoundHandler(req,res){
  return res.status(404).send('Sorry, can not seem to find it');
}

app.listen(3000,() => {
  console.log('listening to 3000');


});
