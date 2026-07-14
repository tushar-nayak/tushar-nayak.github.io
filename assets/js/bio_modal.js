(function () {
  var dialog = document.getElementById("bio-more-dialog");
  var trigger = document.getElementById("bio-more-trigger");
  if (!dialog || !trigger) return;

  trigger.addEventListener("click", function () {
    dialog.showModal();
  });

  dialog.addEventListener("click", function (event) {
    var rect = dialog.getBoundingClientRect();
    var clickedInside =
      rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
    if (!clickedInside) dialog.close();
  });
})();
