$(function() {
  var $blinds = $("[id^=blind]");
  
  function dropBlinds() {
    $blinds.each(function(idx) {
      var $blind = $blinds.eq(idx);
      
      $blind.delay(1500 * idx).animate({
        top: "+=" + $blind.height(),
        height: 0
      });
    });
  }
  
  dropBlinds();

  $("a").on("click", function(e) {
    e.preventDefault();
    
    $blinds.finish();
    $blinds.removeAttr("style"); 
    dropBlinds();
  });
})