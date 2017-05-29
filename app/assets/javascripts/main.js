$(function(){
  if($('.sub-header-mobile').length && $(".posts").length){
    $(".posts").scroll(function(event){
      var subHeader = $('.sub-header-mobile'),
      scroll = $('.posts').scrollTop();

      if (scroll >= 80) {
        subHeader.addClass('fixed-top');
      } else{
        subHeader.removeClass('fixed-top');
      }
    });
  }

  if($(".communications").length){
    setTimeout(function(){
      $(".communications").slideUp(400);
    }, 4000);
  }
});
