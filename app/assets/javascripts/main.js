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

  if($('.featured.unsigned').length){
    $('.featured.unsigned').mouseover(function(){
      $('.unsigned-message').css("height", $('.featured.unsigned').height());
      $('.unsigned-message').css("width", $('.featured.unsigned').width());
      $('.unsigned-message').show();

      $('.unsigned-message-mobile').show();
      $('.carousel').scrollLeft(0);
      $('.carousel').css("overflow-x", "hidden");
    });

    $('.featured.unsigned').mouseleave(function(){
      $('.unsigned-message-mobile').hide();
      $('.carousel').css("overflow-x", "auto");

      $('.unsigned-message').hide();
      $('.unsigned-message').css("height", 0);
      $('.unsigned-message').css("width", 0);
    });
  }

  if($('#publish-button').length){
    setTimeout(function(){
      $('#publish-button').popover({
        html: true,
        content: "<strong>Ei, você!</strong> Tem alguma <strong>imagem</strong>, <strong>vídeo</strong> ou <strong>GIF</strong> para compartilhar com a galera?",
        placement: "left",
        id: "publish-popover",
        trigger: "manual"
      });

      $('#publish-button').popover("show");
    }, 100000);
  }

  $('#publish-button').click(function(){
    $('#publish-button').popover("hide");
  });
});
