  // function for when the 'cat button id' is clicked
    $("#search-button").on("click", function() {
      event.preventDefault();

      var searchChoice = $("#search-param").val();

      var button = $("<button>");
      button.text(searchChoice);
      button.attr("class", "btn btn-primary search");
      button.attr("data-search", searchChoice);
      $("#button-spot").append(button);
      //grabs random gif about a cat

      giphySerach(searchChoice);

    });

    $("body").on("click",".search", function() {
      var searchChoice = $(this).attr("data-search");
      giphySerach (searchChoice);
    });

function giphySerach (searchID) {
        // var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=pokemon";
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchID + "&api_key=dc6zaTOxFJmzC"

      // ajax function that goes to giphy and pulls random gifs
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      //function for when ajax returns done
      .done(function(response) {

        $("#images").empty();
        for (var i = 0 ; i < 11; i++) {
        //variable to store a url generated from giphy
          var gifURL = response.data[i].images.fixed_height.url;
          var stillURL = response.data[i].images.fixed_height_still.url;
          var gifRating = response.data[i].rating;

          //creates an imgtag holder
          var pokemonImage = $("<img>");
          var imageHolder = $("<div>"); 
          var ratingHolder = $("<p>");

          ratingHolder.text("Rating: " + gifRating);
          // attacks an alt and the img to the new img tag
          pokemonImage.attr("src", stillURL);
          pokemonImage.attr("alt", "pokemon image");
          pokemonImage.attr("class","pokemon-gif");
          pokemonImage.attr("data-still",stillURL);
          pokemonImage.attr("data-animate",gifURL);
          pokemonImage.attr("data-state",'still');
          pokemonImage.attr("class","pokemon-gif");
          imageHolder.attr("class","well");
          // imageHolder.append(ratingHolder);
          imageHolder.append(pokemonImage);

          //adds the img above older images 
          $("#images").prepend(imageHolder);
        }
      });
}

    $("body").on("click",".pokemon-gif" , function() {
      // STEP ONE: study the html above.
      // Look at all the data attributes.
      // Run the file in the browser. Look at the images.

      // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

      // STEP TWO: make a variable named state and then store the image's data-state into it.
      // Use the .attr() method for this.
      var curState = $(this).attr("data-state");
      var animated = $(this).attr("data-animate");
      var stilled = $(this).attr("data-still");
      // console.log(curState);
      if (curState == 'still') {
        $(this).attr("data-state","animate");
        $(this).attr("src",animated);
      }
      else {
         $(this).attr("data-state","still");
         $(this).attr("src",stilled);
      }

    });