console.log('js loaded');

$(document).ready(function() {
  console.log('up and running!');

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

  function appendJokes(jokes) {
    $("#jokeBox").empty();

    for (var i = 0; i < jokes.length; i++) {
      $("#jokeBox").append('<div><h2>' + jokes[i].whoseJoke + '</h2><p>' + jokes[i].jokeQuestion + '</p><p>' + jokes[i].punchLine + '</p></div>');
    }

  }

  $("#jokeForm").on("submit", postJoke);

  function postJoke(joke) {
    event.preventDefault();

    $( '#whoseJoke' ).val('');
    $( '#jokeQuestion' ).val('');
    $( '#punchLine' ).val('');


    var newJoke = {};

    $.each($('#jokeForm').serializeArray(), function(i, field) {
      newJoke[field.name] = field.value;
    });

    console.log(newJoke);

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
