$(function(){
  if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    $('.modal').on('show.bs.modal', function(){
      var marginTop = $(window).scrollTop();

      $(".modal").css({
        position: 'absolute',
        marginTop: marginTop + "px",
        bottom: 'auto'
      });

      setTimeout(function() {
        $(".modal-backdrop").css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          ) + 'px'
        });
      }, 0);
    });
  }

  $(window).scroll(function(event){
    if($('.sub-header-mobile').length){
      var subHeader = $('.sub-header-mobile'),
      scroll = $(window).scrollTop();

      if (scroll >= 45) {
        subHeader.addClass('fixed-top');
      } else{
        subHeader.removeClass('fixed-top');
      }
    }
  });

  if($(".communications").length){
    setTimeout(function(){
      $(".communications").slideUp(200);
    }, 5000);
  }
});
