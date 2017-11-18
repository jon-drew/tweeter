$(document).ready(function(){
    $(".new-tweet textarea").on('keyup', function(event){
      ($('.counter').text(140-$(this).val().length)).toggleClass('over140', $(this).val().length > 140);
    })
  }
);
