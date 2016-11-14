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

  function appendJokes(cats) {
    $("#jokeBox").empty();

    for (var i = 0; i < cats.length; i++) {
      $("#jokeBox").append('<div><h2>' + jokes[i].whoseJoke + '</h2><p>' + jokes[i].jokeQuestion + jokes[i].punchLine'</p></div>');
    }

  }

  $("#jokeForm").on("submit", postJoke);

  function postJoke(cat) {
    event.preventDefault();
    var newCat = {};

    $.each($('#catForm').serializeArray(), function(i, field) {
      newCat[field.name] = field.value;
    });

    console.log(newCat);

    $.ajax({
      type: 'POST',
      url: '/cats',
      data: newCat,
      success: function(data) {
        getCats();
      }
    });
  }
});
