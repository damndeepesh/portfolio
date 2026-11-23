// 404: show the missing path in the terminal and filter the link list. No network.
(function () {
  "use strict";
  var path = document.getElementById("lost-path");
  if (path && location.pathname) path.textContent = location.pathname;
  var q = document.getElementById("q");
  var items = Array.prototype.slice.call(document.querySelectorAll("#hits li"));
  var status = document.getElementById("hit-count");
  if (!q) return;
  q.addEventListener("input", function () {
    var v = q.value.trim().toLowerCase();
    var shown = 0;
    items.forEach(function (li) {
      var hit = !v || li.textContent.toLowerCase().indexOf(v) !== -1;
      li.hidden = !hit;
      if (hit) shown++;
    });
    status.textContent = v ? (shown ? shown + " of " + items.length + " pages match" : "No match. Try \u201cinstall\u201d or go home.") : "";
  });
  q.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var first = items.filter(function (li) { return !li.hidden; })[0];
    if (first) first.querySelector("a").click();
  });
})();
