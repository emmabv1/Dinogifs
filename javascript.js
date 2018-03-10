var dinos = ["T-Rex", "Stegosaurus", "Velociraptor", "Triceratops"];

function displaygifs() {
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&api_key=R0sYR15sLIG7qEkAZAEz90Y2f2foDfUm";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        for (var i = 0; i < 10; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div class='giffy'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var dinogif = $("<img>");
                dinogif.attr("src", results[i].images.fixed_height_still.url);
                dinogif.attr("data-still", results[i].images.fixed_height_still.url);
                dinogif.attr("data-animate", results[i].images.fixed_height.url);
                dinogif.attr("data-state", "still");
            gifDiv.append(dinogif);
            gifDiv.append(p);
            $("#gifdiv").prepend(gifDiv);
            }
        }

        $("img").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
        });
    });
}


function renderButtons() {
    $("#dinobuttons").empty();

    for (var i = 0; i < dinos.length; i++) {
        var a = $("<button>");
        a.addClass("dinobtn");
        a.attr("data-name", dinos[i]);
        a.text(dinos[i]);
        $("#dinobuttons").append(a);
    }
}

$("#dinoadd").on("click", function(event) {
    event.preventDefault();
    var dino = $("#newdino").val().trim();
    dinos.push(dino);
    renderButtons();
});

$(document).on("click", ".dinobtn", displaygifs);

renderButtons();


