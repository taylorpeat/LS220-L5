$(function() {

  $("form").on("submit", function(e) {
    e.preventDefault();

    $f = $("form");

    function getFormData($form) {
      var o = {};
      $form.serializeArray().forEach(function(item) {
        o[item.name] = item.value;
      });
      return o;
    }

    function createElement(data) {
      $d = $("<div>", {
        "class": data.shape,
        css: {
          top: +data.start_y,
          left: +data.start_x
        },
        data: data
      });
      return $d;
    }

    $("#container").append(createElement(getFormData($f)));
  });

  $("#start").on("click", function(e) {
    e.preventDefault();

    $("#container div").each(function() {
      $shape = $(this);
      $shape.css({
        left: +$shape.data().start_x,
        top: +$shape.data().start_y
      });
      $shape.animate({
        left: +$shape.data().end_x,
        top: +$shape.data().end_y
      }, 1500);
    });
  });

  $("#stop").on("click", function(e) {
    e.preventDefault();

    $("#container div").each(function() {
      $(this).stop();
    });
  });
});