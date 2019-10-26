
$(document).ready(function () {
    //topic array for animal search to be added
    var topics = [];

    //Function with AJAX to search for a data/ chose my own API key and 10 pictures for each animal.

    function displayanimalShow() {

        var x = $(this).data("search");
        console.log(x);
        images = [];
        $("#gifs-appear-here").empty();

        //create a variable for data
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            x + "&api_key=PZfMcJG8iWOXERGCKxCSLOrRXG0Iwz8d&limit=10";
        console.log(queryURL);

        //  call Ajax funtion to store the data

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            //then take the data and apply this function to each animal using a loop method
            //create varible fpr images and rating for each image.
            //using Jqurey to display the result on html tags(append it)
            .done(function (response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {

                    var showDiv = $("<div class='col-md-4'>");

                    var rating = results[i].rating;
                    var defaultAnimatedSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    var showImage = $("<img id='imgs'>");
                    var p = $("<p>").text("Rating: " + rating);

                    showImage.attr("src", staticSrc);
                    showImage.addClass("animalGiphy");
                    showImage.attr("data-state", "still");
                    showImage.attr("data-still", staticSrc);
                    showImage.attr("data-animate", defaultAnimatedSrc);
                    showDiv.append(p);
                    showDiv.append(showImage);
                    $("#gifs-appear-here").prepend(showDiv);

                }
            });
    }

    //Submit button click event takes search term from the form section trim it and put it in a button.
    $("#addShow").on("click", function (event) {
        event.preventDefault();
        var newShow = $("#animalInput").val().trim();
        topics.push(newShow);
        console.log(topics);
        $("#animalInput").val('');
        displayButtons();
    });

    //Function iterates through topics array to display button.
    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "show");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    //Click event on button with id of "show" executes displayNetflixShow function
    $(document).on("click", "#show", displayanimalShow);

    //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
    $(document).on("click", ".animalGiphy", stopGifs);

    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
    function stopGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});



