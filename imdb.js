const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const movieQuote = require("popular-movie-quotes");
const movie = require("node-movie");

const app = express();
app.set("view-port", "ejs");

app.use(express.static("style"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const moviequo = movieQuote.getSomeRandom(1);
  let quo = moviequo[0].quote;
  let film = moviequo[0].movie;
  res.render("imdb.ejs", { quote: quo, moviename: film });
});

app.post("/", function (req, res) {
  movie("'" + req.body.title + "'", (data) => {
    if (data.Response == "False") {
      res.render("tryagain.ejs");
    } else {
      var image = data.Poster;
      var title = data.Title;
      var type = data.Type;
      var year = data.Year;
      var actors = data.Actors;
      var ratings = data.imdbRating;
      var descirption = data.Plot;
      var id = data.imdbID;
      res.render("imdb-result.ejs", {
        Image: image,
        Title: title,
        Type: type,
        Year: year,
        Actors: actors,
        Ratings: ratings,
        Plot: descirption,
        Id: id,
      });
    }
  });
});

app.listen(2000, function () {
  console.log("Server Started At 2000");
});
