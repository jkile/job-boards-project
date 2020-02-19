let userLocation = "phoenix";
let description = "javascript";
var searchValue = "spaghetti";

var youtubeURL;

let queryURL =
  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDBtwVpRnmyR4QnIWR8eQSt2OL6zptVpI0&part=snippet&q=" +
  searchValue;

function youtubeCall() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    response.items[0].id.videoId;
    let videoId = response.items[0].id.videoId;
    for (let i = 0; i < response.items.length; i++) {
      videoId = response.items[i].id.videoId;
      console.log(videoId);
      youtubeURL = "https://www.youtube.com/watch?v=" + videoId;
      printUrl(youtubeURL);
    }
  });
}
function printUrl(url) {
  console.log(url);
}

$("#recipe-container").empty();
$("#recipe-container").append($("<div>").append($("<div>").append()));
