$(function(){
  if($(".posts").length){
    var lastScrollTop = 0;
    $(".posts").scroll(function(event){
      var st = $(".posts").scrollTop();

      if (st > lastScrollTop){
        if($(".header.sub").length){
          $(".header.sub").css("display", "none");
        }
      } else{
       if($(".header.sub").length){
         $(".header.sub").css("display", "block");
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
