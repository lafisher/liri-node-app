        
// Narwhals Playing Mahjong
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

//keys - dont forget to .gitignore this later
var keys = require('./keys.js');

// give user the options

function startHal (){
  console.log("What can I do for you dave?");
  console.log("type: 'my-tweets', 'spotify-this-song', 'movie-nerd', or 'open-the-pod-bay-doors' after node liri.js to play" );
};
startHal();
// hal 
var tweet = 'my-tweets';
var spot = 'spotify-this-song';
var movie = 'movie-nerd';
var podBayDoors = 'open-the-pod-bay-doors'
var inputOne = process.argv[2];
var inputTwo = process.argv[3];

//function to start playing with liri bot,  can't help the 2001 references it's too easy 
//this is wrong.  had it working at one point. lost it. i blame H.A.L.
function daisy(){
  if (inputOne = spot) {
     songSearch();
     
  }
  (inputOne = movie) 
    movieSearch();
   
     
  };
   
 /* function myTweets() {
 var params = {screen_name: 'LeighluDevDevi'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(' ');
        console.log('================ My Tweets ================');
        tweetData.forEach(function(obj) {
          console.log('--------------------------');
          console .log('Time: ' + obj.created_at);
          console.log('Tweet: ' + obj.text);
          console.log('--------------------------');
          console.log(' ');
        });
        console.log('===========================================');
        console.log(' ');
        // console.log(tweets);

      } else {
        console.log("I'm sorry Dave. I'm Afraid I can't do that.");
      }
    });
  },*/
  
 function songSearch() {
    spotify.search({ type: 'track', query: inputTwo || 'The Sign Ace of Base' }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }

      if(data.tracks.items.length > 0) {
        var record = data.tracks.items[0];

        console.log(' ');
        console.log('*************** Music Stats ****************');
        console.log('Artist: ' + record.artists[0].name);
        console.log('Name: ' + record.name);
        console.log('Link: ' + record.preview_url);
        console.log('Album: ' + record.album.name);
        console.log('********************************************');
        console.log(' ');

      } else {
        console.log("I'm sorry Dave. I'm afraid I can't do that.");
      }

    });
  };
  // "movie-this" command = "movie-nerd" 
  
  function movieSearch () {
    request('http://www.omdbapi.com/?t=' + (inputTwo || 'Mr.Nobody') +'&tomatoes=true', function (error, response, info) {
      if (!error && response.statusCode == 200) {

        var movieData = JSON.parse(info);

        console.log(' ');
        console.log('*************** Movie Stats ****************');
        console.log('Title: ' + movieData.Title);
        console.log('Year: ' + movieData.Year);
        console.log('IMDB Rating: ' + movieData.imdbRating);
        console.log('Country: ' + movieData.Country);
        console.log('Language: ' + movieData.Language);
        console.log('Plot: ' + movieData.Plot);
        console.log('Actors: ' + movieData.Actors);
        console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
        console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);
        console.log('********************************************');
        console.log(' ');

      } else {
        console.log("I'm sorry Dave. I'm afraid I can't do that.");
      }
    });
  }
 /*function openPodBay () {
    fs.readFile('random.txt', 'utf8', function(err, data) {
      if(err) throw err;
      console.log(data.toString());

      var rando = data.toString().split(',');

    });
  

};*/
              