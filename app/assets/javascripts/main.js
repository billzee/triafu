$(function(){
  if($('.sub-header-mobile').length){
    $(window).scroll(function(event){

      var subHeader = $('.sub-header-mobile'),
      scroll = $(window).scrollTop();

      if (scroll >= 40) {
        subHeader.addClass('fixed-top');
        subHeader.addClass('sticky-top');
      } else{
        subHeader.removeClass('fixed-top');
        subHeader.removeClass('sticky-top');
      }
    });
  }

  if($(".communications").length){
    setTimeout(function(){
      $(".communications").slideUp(300);
    }, 4000);
  }
});
