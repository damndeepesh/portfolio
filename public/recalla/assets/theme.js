(function () {
  var root = document.documentElement;
  // Marks that scripts run, so the theme toggle only shows when it can work.
  root.classList.add("can-theme");
  try {
    var t = localStorage.getItem("recalla-theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();
