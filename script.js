
let youtubeArray = [];

$('#search-button').on('click', function (event) {
	event.preventDefault();
	//pull value off of search box
	youtubeArray = [];
	var searchValue = $('#search-term')
		.val()
		.trim();

	console.log(searchValue);
	let currentCard = -1;
	$.when(recipeCall(searchValue)).done(function (recipeData) {
		console.log(recipeData)
		$("#card-list").empty()
		for (let i = 0; i < 5; i++) {
			//get the videoID off of the response
			let recipeUrl = recipeData.hits[i].recipe.url;
			let recipeLabel = recipeData.hits[i].recipe.label;
			let recipeImage = recipeData.hits[i].recipe.image;
			youtubeCall(recipeLabel).then(function (youtubeData) {
				currentCard++;
				console.log(youtubeData);
				let videoId = youtubeData.items[0].id.videoId;
				console.log(videoId);
				//building the youtubeURL with the video ID
				let youtubeURL = 'https://www.youtube.com/embed/' + videoId;
				youtubeArray.push(youtubeURL);
				printCards(recipeUrl, recipeLabel, recipeImage, currentCard);
			})
		}
	})
});

//function to make ajax call to youTube
function youtubeCall(searchValue) {
	let youTubeURL =
		'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDBtwVpRnmyR4QnIWR8eQSt2OL6zptVpI0&part=snippet&q=' +
		searchValue;
	return $.ajax({
		url: youTubeURL,
		method: 'GET',
	})
}

//function that builds the iframe with the specific youTubeURL
function printCards(recipeUrl, recipeLabel, recipeImage, currentCard) {
	$("#card-list").append(
		$("<div>").attr("class", "card mb rounded").append(
			$("<div>").attr("class", "card-header has-background-link top-rounded").append(
				$("<div>").attr("class", "card-header-title has-text-white").text(recipeLabel)
			),
			$("<div>").attr("class", "card-content").append(
				$("<img>").attr({ src: recipeImage, class: "card-image mb" }),
				$("<a>").attr({href: recipeUrl, class: "mb"}).text("Full Recipe Here").append(
					$("<br>")
				),
				$("<button>").attr({ class: "button is-primary mt", id: currentCard + "btn" }).text("Related Video")
			)
		).hide().fadeIn("slow")
	)
}

//function to make AJAX call to EDAMAM API
function recipeCall(searchValue) {
	let recipeURL =
		'https://api.edamam.com/search?q=' + searchValue + '&app_key=874f851dcc3dd7631f7bf9660c6a2943&app_id=787163bd';
	return $.ajax({
		url: recipeURL,
		method: 'GET',
	})
}

$("#card-list").on("click", "button", function (e) {
	let idNumber = this.id[0];
	let currentVideo = youtubeArray[idNumber]
	$("#videoIframe").attr("src", currentVideo);
	$("#videoModal").addClass("is-active");
	document.getElementById("closeModal").addEventListener("click", function(e){
		document.getElementById("videoModal").classList.remove("is-active");
	})
})
