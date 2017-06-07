$(function(){
  $(window).scroll(function(event){
    if($('body').hasClass('modal-open')){
      var x=window.scrollX, y=window.scrollY;
      window.scrollTo(x,y);
    }

    if($('.sub-header-mobile').length){
      var subHeader = $('.sub-header-mobile'),
      scroll = $(window).scrollTop();

      if (scroll >= 40) {
        subHeader.addClass('fixed-top');
      } else{
        subHeader.removeClass('fixed-top');
      }
    }
  });

  if($(".communications").length){
    setTimeout(function(){
      $(".communications").slideUp(300);
    }, 4000);
  }
});
