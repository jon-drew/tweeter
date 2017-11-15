/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

$('.new-tweet form').submit(function(event){
  event.preventDefault();
  var newTweet = $(this).serialize();
  if ($('.new-tweet form textarea').val() === "") {
    $('.new-tweet form').append($('<footer>').text("Tweets cannot be blank."))
  } else if (($('.new-tweet form textarea').val().length > 140)) {
    $('.new-tweet form').append($('<footer>').text("Tweets cannot be larger than 140 characters."))
  } else {
    $.ajax( {
      url: '/tweets',
      method: 'POST',
      datatype: 'string',
      data: newTweet,
      success: function () {
        loadTweets([tweet])
      }
    })
  }
})

function renderTweets(tweets) {
  for (tweet of tweets) {
    $(".tweets-container").prepend(createTweetElement(tweet))
  }
}

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet').append($('<header>').text(tweet.user.name))
  .append($('<body>').text(tweet.content.text)).append($('<footer>').text(tweet.created_at))
  return $tweet;
}

function loadTweets() {
  $.ajax( {
    url: '/tweets',
    method: 'GET',
    success: function (tweets) {
      renderTweets(tweets);
    }
  })
}

loadTweets();


});











