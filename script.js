let searchLocation = "phoenix";
let searchValue = "javascript";


$.ajax({
    url: "http://jobs.github.com/positions.json?description=" + searchValue + "&location=" + searchLocation,
    type: "GET"
}).then(function(response){
    console.log(response);
})