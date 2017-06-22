$(function(){

  var $sidenav = $('.sidenav');

  $(document)
  .on('focus', '#comment-form', function() {
    console.log('chamou');
    $sidenav.addClass('fixfixed');
  })
  .on('blur', '#comment-form', function() {
    $sidenav.removeClass('fixfixed');
  });


  $(window).scroll(function(event){
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
