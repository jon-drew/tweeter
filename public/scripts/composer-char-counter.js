$(document).ready(function(){
  $(".new-tweet form textarea").keyup(function(){
    ($(this).parent().children("span.counter").text(140-$(this).val().length))
  })
});