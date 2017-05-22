$(function(){
  if($(".posts").length){
    $(".header-mobile.sub").css("display", "none");
    var lastScrollTop = 0;

    $(".posts").scroll(function(event){
      var st = $(".posts").scrollTop();

      if($(".header-mobile.sub").length){
        if (st == 0 || st > lastScrollTop){
          $(".header-mobile.sub").fadeOut(200);
        } else{
          $(".header-mobile.sub").fadeIn(200);
        }
      }

      lastScrollTop = st;
    });
  }

  if($(".communications").length){
    setTimeout(function(){
      $(".communications").slideUp(400);
    }, 4000);
  }
});
