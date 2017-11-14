$(document).ready(function(){
  $(".new-tweet form textarea").keypress(function(){
    //console.log($(this).val().length)
    ($(this).parent().children("span.counter").text(139-$(this).val().length))
  })
});