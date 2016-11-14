$(document).ready(function() {

// - get thte jokes from the jokes.js rile - //

    getJokes();

    function getJokes() {
        $.ajax({
            type: 'GET',
            url: '/jokes',
            success: function(data) {
                console.log('got the joke data!');
                appendJokes(data);
            }
        });
    }

// - append jokees to the DOM - //
    function appendJokes(jokes) {
        $("#jokeBox").empty();

        for (var i = 0; i < jokes.length; i++) {
            $("#jokeBox").append('<div><h2>' + jokes[i].whoseJoke + '</h2><p>' + jokes[i].jokeQuestion + '</p><p>' + jokes[i].punchLine + '</p></div>');
        }

    }

    $("#jokeForm").on("submit", postJoke);

// - add incoming jokes to the jokes object - //

    function postJoke(joke) {
        event.preventDefault();

        var newJoke = {};

        $.each($('#jokeForm').serializeArray(), function(i, field) {
            newJoke[field.name] = field.value;
        });

  // - clear input fields - //

        $('#whoseJoke').val('');
        $('#jokeQuestion').val('');
        $('#punchLine').val('');

        $.ajax({
            type: 'POST',
            url: '/jokes',
            data: newJoke,
            success: function(data) {
                getJokes();
            }
        });
    }
});
