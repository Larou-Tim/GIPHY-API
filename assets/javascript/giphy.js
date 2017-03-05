$(document).ready(function() {

  var initialSearchIcons = ['Pikachu', 'Charizard', 'Dragonite', 'Gyarados','Magikarp']

  for (var i = 0; i < initialSearchIcons.length; i++) {
    var searchChoice = initialSearchIcons[i];
    var button = $("<button>");
    button.text(searchChoice);
    button.attr("class", "btn btn-primary search");
    button.attr("data-search", searchChoice);
    $("#button-spot").append(button);
  }

});


$("#search-button").on("click", function() {

  initialSearch();

});

$("body").on("click",".search", function() {
  var searchChoice = $(this).attr("data-search");
  giphySerach (searchChoice);

});


$(document).keypress(function(e) {
    if(e.which == 13) {
        initialSearch();
    }
});


function initialSearch (searchParam) {

  var searchChoice = searchParam || $("#search-param").val().trim();


  var button = $("<button>");
  button.text(searchChoice);
  button.attr("class", "btn btn-primary search");
  button.attr("data-search", searchChoice);
  $("#button-spot").append(button);
 

  giphySerach(searchChoice);
}

function giphySerach (searchID) {
    
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchID + "&api_key=dc6zaTOxFJmzC"
  
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response) {

    $("#images").empty();
    for (var i = 0 ; i < 11; i++) {
    
      var gifURL = response.data[i].images.fixed_height.url;
      var stillURL = response.data[i].images.fixed_height_still.url;
      var gifRating = response.data[i].rating;

      
      var pokemonImage = $("<img>");
      var imageHolder = $("<div>"); 
      var ratingHolder = $("<p>");

      ratingHolder.text("Rating: " + gifRating);
      
      pokemonImage.attr("src", stillURL);
      pokemonImage.attr("alt", "pokemon image");
      pokemonImage.attr("class","pokemon-gif");
      pokemonImage.attr("data-still",stillURL);
      pokemonImage.attr("data-animate",gifURL);
      pokemonImage.attr("data-state",'still');
      pokemonImage.attr("class","pokemon-gif");
      imageHolder.attr("class","well");

     
      imageHolder.append(pokemonImage);
      imageHolder.append(ratingHolder);

    
      $("#images").prepend(imageHolder);
    }
  });
}

    $("body").on("click",".pokemon-gif" , function() {
     
      var curState = $(this).attr("data-state");
      var animated = $(this).attr("data-animate");
      var stilled = $(this).attr("data-still");
     
      if (curState == 'still') {
        $(this).attr("data-state","animate");
        $(this).attr("src",animated);
      }
      else {
         $(this).attr("data-state","still");
         $(this).attr("src",stilled);
      }

    });

