(function () {
  var splash = document.getElementById("site-splash");
  if (!splash) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = false;

  try {
    seen = window.sessionStorage.getItem("tn-splash-seen") === "true";
  } catch (error) {
    // Private browsing modes may block sessionStorage; show the splash once.
  }

  function dismiss() {
    splash.classList.add("is-dismissed");
    document.body.classList.remove("splash-active");
  }

  if (seen || reducedMotion) {
    dismiss();
    return;
  }

  document.body.classList.add("splash-active");
  try {
    window.sessionStorage.setItem("tn-splash-seen", "true");
  } catch (error) {
    // Continue without persistence when sessionStorage is unavailable.
  }

  window.setTimeout(dismiss, 2000);
})();
