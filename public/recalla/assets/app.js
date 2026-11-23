(function () {
  var root = document.documentElement;
  var VERSION = root.dataset.version;
  root.classList.add("js");

  // In-page links: with <base href="/recalla/"> a bare "#how" would navigate to
  // /recalla/#how, reloading the page when it was opened at /recalla (no slash).
  // Scroll in place instead, so nothing reloads at either URL.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var id = decodeURIComponent(a.getAttribute("href").slice(1));
    var target = id ? document.getElementById(id) : document.body;
    if (!target) return;
    e.preventDefault();
    var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: calm ? "auto" : "smooth" });
    if (id) {
      history.replaceState(null, "", location.pathname + location.search + "#" + id);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });

  // Version lives in <html data-version>; rewrite the static fallback links to match it.
  document.querySelectorAll("[data-ver]").forEach(function (el) { el.textContent = VERSION; });
  document.querySelectorAll("a[data-asset]").forEach(function (a) {
    var t = a.dataset.asset;
    var file = t === "SHA256SUMS" ? t : "recalla-v" + VERSION + "-" + t + ".tar.gz";
    a.href = "https://github.com/damndeepesh/recalla/releases/download/v" + VERSION + "/" + file;
  });

  // Theme toggle (theme.js applies the saved choice before first paint).
  var themeBtn = document.getElementById("theme");
  themeBtn.addEventListener("click", function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    var next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("recalla-theme", next); } catch (e) {}
  });

  // Tabs: arrow keys, Home/End, roving tabindex.
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }
  document.querySelectorAll(".js-hide-label").forEach(function (l) { l.hidden = true; });
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (e) {
      var k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault();
      select(tabs[(k + tabs.length) % tabs.length], true);
    });
  });
  select(tabs[0]);

  // Copy buttons announce through one polite live region.
  var live = document.getElementById("live");
  document.querySelectorAll(".cmd .copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.parentNode.querySelector("[data-copy]").textContent.replace(/\s+/g, " ").trim();
      var done = function (msg) {
        var ok = msg === "Copied";
        btn.textContent = ok ? "Copied" : "Copy";
        btn.classList.toggle("is-done", ok);
        live.textContent = "";
        setTimeout(function () { live.textContent = msg; }, 30);
        clearTimeout(btn._t);
        btn._t = setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("is-done"); }, 1800);
      };
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .then(function () { done("Copied"); }, function () { done("Copy failed, select the text instead"); });
    });
  });

  // Detect the visitor's platform locally (no network) and highlight the matching download card.
  function detect(arch) {
    var ua = navigator.userAgent || "";
    var uad = navigator.userAgentData;
    var plat = ((uad && uad.platform) || navigator.platform || "").toLowerCase();
    var win = /^win/.test(plat) || /Windows/.test(ua);
    if (win) {
      var wsl = document.querySelector('.bin[data-os="linux"][data-arch="x64"]');
      wsl.classList.add("is-rec");
      wsl.querySelector(".rec").textContent = "Use inside WSL";
      return;
    }
    var os = /mac/.test(plat) || /Macintosh/.test(ua) ? "mac" : /linux/.test(plat) || (/Linux/.test(ua) && !/Android/.test(ua)) ? "linux" : null;
    if (!os) return;
    var a = arch || (/aarch64|arm64|armv8/i.test(ua + plat) ? "arm" : os === "linux" ? "x64" : null);
    var cards = document.querySelectorAll('.bin[data-os="' + os + '"]');
    var hits = Array.prototype.filter.call(cards, function (c) { return !a || c.dataset.arch === a; });
    hits.forEach(function (c) { c.classList.add("is-rec"); });
    var note = document.getElementById("detected");
    if (!a) {
      note.textContent = "We detected macOS but browsers can't tell the chip. Apple silicon is any Mac from late 2020 on; check Apple menu > About This Mac.";
      note.hidden = false;
    }
  }
  var uad = navigator.userAgentData;
  if (uad && uad.getHighEntropyValues) {
    uad.getHighEntropyValues(["architecture"]).then(
      function (v) { detect(v.architecture === "arm" ? "arm" : v.architecture === "x86" ? "x64" : null); },
      function () { detect(); }
    );
  } else {
    detect();
  }
})();
