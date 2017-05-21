$(function(){
  // if($(".posts").length){
  //   var lastScrollTop = 0;
  //   $(".posts").scroll(function(event){
  //     var st = $(".posts").scrollTop();
  //
  //     if (st > lastScrollTop){
  //       if($(".header.sub").length){
  //         $(".header.sub").slideUp(400);
  //       }
  //     } else{
  //      if($(".header.sub").length){
  //        $(".header.sub").css("visibility", "visible");
  //        setTimeout(function(){
  //          $(".header.sub").slideDown(400);
  //        }, 4000);
  //      }
  //     }
  //
  //     lastScrollTop = st;
  //   });
  // }

  if($(".communications").length){
    setTimeout(function(){
      $(".communications").slideUp(400);
    }, 4000);
  }
});
