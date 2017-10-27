var ApiKey = "zSJ7K4Fsn7crG8FKQQOu1TrKcJxOPGKi";

var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Violet"];

var displayGifs = function() {

	var color = $(this).data("name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + ApiKey + "&q=" + color + "&limit=10&offset=0&rating=G&lang=en";

	var promise = $.ajax({
	    url: queryURL,
	    method: "GET"
	});

	promise.done(function(response) {
		$("#results").empty();
		for (var i = 0; i < 10; i++) {
			var newDiv = $("<div>");

			var newGif = $("<img>");
			newGif.attr("src", response.data[i].images.fixed_height_still.url)
			newGif.attr("data-still", response.data[i].images.fixed_height_still.url);
			newGif.attr("data-animate", response.data[i].images.fixed_height.url);
			newGif.attr("data-state", "still");
			newGif.addClass("gif");
			newDiv.append(newGif);

			var newP = $("<p>");
			newP.text("Rating: " + response.data[i].rating);
			newDiv.prepend(newP);

			$("#results").append(newDiv);
		};
	});
};

var renderButtons = function() {
	$("#buttons").empty();

	for (var i = 0; i < colors.length; i++) {

		var newBtn = $("<button>");
		newBtn.text(colors[i]);
		newBtn.addClass("colors");
		newBtn.attr("data-name", colors[i]);
		$("#buttons").append(newBtn);
	}
};


$("#additional").on("click", function(event) {
    event.preventDefault();

	var newColor = $("#user-input").val().trim();
	$("#user-input").val("");

	colors.push(newColor);
	renderButtons();
});

$(document).on("click", ".colors", displayGifs);

$(document).on("click", ".gif", function(event) {
	if ($(this).attr("data-state") === "still") {
		$(this).attr("src", $(this).data("animate"));
		$(this).attr("data-state", "animated");
	} else if ($(this).attr("data-state") === "animated") {
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still");
	}



});

renderButtons();
