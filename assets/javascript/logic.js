$( document ).ready(function() {
    
    var animals = ["Giraffes", "Koalas", "Lions", "Rhinoceros", "Dogs", "Elephants", "Pandas", "Otters", "Cheetahs", "Panthers","Bears", "Penguins"];
    
    function displayGifButtons(){
        $("#gifButtons").empty(); 
        for (var i = 0; i < animals.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#gifButtons").append(gifButton);
        }
    }
   
    function addNewButton(){
        $("#addGif").on("click", function(){
        var action = $("#animal-input").val().trim();
        if (action == ""){
          return false; 
        }
        animals.push(action);
        displayGifButtons();
        return false;
        });
    };
   
    function removeLastButton(){
        $("#deleteGif").on("click", function(){
        animals.pop(action);
        displayGifButtons();
        return false;
        });
    }
    
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=eYdLs2ErLUwqNfAtT9or6eXHVX6B9jPH";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#showGifs").empty();
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this animal");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
               
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#showGifs").prepend(gifDiv);
            }
        });
    }
   
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    