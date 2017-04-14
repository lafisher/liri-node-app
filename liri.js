        
// Narwhals Playing Mahjong
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

//keys - dont forget to .gitignore this later
var keys = require('./keys.js');

// console.log to give user the input options

function startHal (){
  console.log("What can I do for you dave?");
  console.log("type: 'my-tweets', 'spotify-this-song' song title, 'movie-nerd' movie title, or 'open-the-pod-bay-doors' after node liri.js to play" );
};
//startHal();

var inputOne = process.argv[2];
var inputTwo = process.argv[3];

//function to start liri bot,  can't help the 2001 references it's too easy 
//swtich case break isn't my favorite way to do things but this is working so i'm going with it 
function daisy(){
  switch(inputOne) {
     
     case 'my-tweets':
     myTweets();
     break;
     
     case 'spotify-this-song':
     songSearch();
     break;

     case 'movie-nerd': 
     movieSearch();
     break;

     case 'open-the-pod-bay-doors':
     openPodBay ()
     break;
  }   
   
};
   
function myTweets() {

  var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});
// set parameters 
	var params = {
		screen_name: 'LeighluDevDevi',
		count: 20,
	};

//tweet tweet Mother!%@*&!$
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
      console.log("*********Tweet Tweet*********");
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("***********Tweet Tweet***********");
	        }
	    };
	});
};
  
 function songSearch() {
    spotify.search({ type: 'track', query: inputTwo || 'Mr. Roboto' }, function(err, data) {
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
 function openPodBay () {
  	console.log("daisy daisy give me your answer do . . .");
    fs.readFile('random.txt', 'utf8', function(err, data) {
      if(err) throw err;
      
      console.log(data.toString());
      movieSearch(data.toString());
//not working correctly currently 
});
 }
daisy();
startHal();
              