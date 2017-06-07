$(function(){
  $('body').on('touchmove', function(e){
    if($('.scroll-disable').has($(e.target)).length) e.preventDefault();
  });

  $('body').on('shown.bs.modal', function(){
    $(this).addClass('scroll-disable');
  });

  $('body').on('hidden.bs.modal', function(){
    $(this).removeClass('scroll-disable');
  });

  if($('.sub-header-mobile').length){
    $(window).scroll(function(event){

      var subHeader = $('.sub-header-mobile'),
      scroll = $(window).scrollTop();

      if (scroll >= 40) {
        subHeader.addClass('fixed-top');
      } else{
        subHeader.removeClass('fixed-top');
      }
    });
  }

  if($(".communications").length){
    setTimeout(function(){
      $(".communications").slideUp(300);
    }, 4000);
  }
});
