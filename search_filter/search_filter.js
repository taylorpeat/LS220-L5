$(function() {
  $("input").on("change", function(e) {
    $("td").each(function(idx) {
      var $cell = $("td").eq(idx);
      $cell.toggle($("input[data-sys=" + $cell.data("sys") + "]").prop("checked"));
    });
  });
});