$(function() {
  console.log('chamou');
  if ($(".communications").length){
    $(".panel-container").css("padding-top", "5.5em");

    setTimeout(function(){
      $(".communications").slideUp(100);
      $(".panel-container").css("padding-top", "3.5em");
    }, 3500);
  }
});
