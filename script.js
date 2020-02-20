$('#search-button').on('click', function(event) {
	event.preventDefault();
	//pull value off of search box
	var searchValue = $('#search-term')
		.val()
		.trim();

	console.log(searchValue);
	//build queryURL for youTUbe with value pulled off search box
	let youTubeURL =
		'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDBtwVpRnmyR4QnIWR8eQSt2OL6zptVpI0&part=snippet&q=' +
		searchValue;

	let recipeURL =
		'https://api.edamam.com/search?q=' + searchValue + '&app_key=874f851dcc3dd7631f7bf9660c6a2943&app_id=787163bd';

	//build query URL for edamam

	//invoke the youtubeCall function
  youtubeCall(youTubeURL);
  //invoke recipeCall function
	recipeCall(recipeURL);
});

//function to make ajax call to youTube
function youtubeCall(queryURL) {
	$.ajax({
		url: queryURL,
		method: 'GET',
	}).then(function(response) {
		console.log(response);

		//loop through the videos
		for (let i = 0; i < response.items.length; i++) {
			//get the videoID off of the response
			let videoId = response.items[i].id.videoId;
			console.log(videoId);
			//building the youtubeURL with the video ID
			let youtubeURL = 'https://www.youtube.com/embed/' + videoId;
			//invoke the printURL function and pass in the youtubeURL
			printUrl(youtubeURL);
		}
	});
}

//function that builds the iframe with the specific youTubeURL
function printUrl(url) {
	console.log(url);
	//creating a variable that stores the iframe html and adds the src attribute
	//the src value is the youtubeURL that gets passed in when the function is called
	var iframe = $(
		"<iframe width='460' height='215' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>"
	).attr('src', url);
	//appending the iframe to the recipe-video div on the index.html
	$('#recipe-videos').append(iframe);
}


//function to make AJAX call to EDAMAM API
function recipeCall(recipeURL) {
	$.ajax({
		url: recipeURL,
		method: 'GET',
	}).then(function(recipeResponse) {
    console.log('recipe response: ', recipeResponse.hits);
    $('#recipe-container').empty();

		for (i = 0; i < 5; i++) {
		  let recipeUrl = recipeResponse.hits[i].recipe.url;
		  let recipeLabel = recipeResponse.hits[i].recipe.label;
		  let recipeImage = recipeResponse.hits[i].recipe.image;
      console.log("label: ", recipeLabel);
      console.log("url: ", recipeUrl);
      console.log("img: ", recipeImage);
		}
	});
}
