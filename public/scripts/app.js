/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

$('.new-tweet form').submit(function(event){
  event.preventDefault();
  let newTweet = $(this).serialize();
  if ($('.new-tweet form textarea').val() === '') {
    $('.new-tweet form').append($('<footer>').text('Tweets cannot be blank.'))
  } else if (($('.new-tweet form textarea').val().length > 140)) {
    $('.new-tweet form').append($('<footer>').text('Tweets cannot be larger than 140 characters.'))
  } else {
    $.ajax( {
      url: '/tweets',
      method: 'POST',
      datatype: 'string',
      data: newTweet,
      success: function () {
        loadTweets();
      }
    })
  }
})

function renderTweets(tweets) {
  $('.tweets-container').empty();
  for (let tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet))
  }
}

// Manual adjustments needed to be made to account for system delays
function unixTimeConverter(tweetEpochDate) {
  let readableDate = (Date.now() - tweetEpochDate) / 60000;

  if (readableDate - 17 < 1) {
    return 'Less than a minute ago.';
  } else if (readableDate < 60) {
    return `${Math.floor(readableDate)-14} minutes ago.`;
  } else if (readableDate < 1440) {
    return `${Math.floor(readableDate/60)} hours ago.`;
  } else {
    return `${Math.floor(readableDate/1440)} days ago.`;
  }
}

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet')
    .append($('<header>').append(`<img src=" ${tweet.user.avatars['small']} " class="avatar">`,
                                 `<h1> ${tweet.user.name} </h1>`, `<span> ${tweet.user.handle} </span>`))
    .append($('<body>').text(tweet.content.text))
    .append($('<footer>').append(unixTimeConverter(tweet.created_at),
                                              '<img class="icon" src="/images/heart.png"/>',
                                              '<img class="icon" src="/images/flag.png"/>',
                                              '<img class="icon" src="/images/retweet.png"/>'))
    //.
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

$('#compose').click(function() {
  if ($('section.new-tweet').is(':hidden')) {
    $('section.new-tweet').slideDown('slow', function(){
    })
    $('textarea').focus()
  } else {
    $('section.new-tweet').slideUp('slow', function(){
    })
  }
})

});





