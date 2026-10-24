/* WaveCarStudio static site interactions (no framework required). */
(function () {
  "use strict";

  var MENU_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
  var CLOSE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  /* Mobile navigation */
  var header = document.querySelector(".hdr");
  var menuButton = header && header.querySelector(".menu-btn");
  if (header && menuButton) {
    var setMenu = function (open) {
      header.setAttribute("data-open", String(open));
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuButton.innerHTML = open ? CLOSE_ICON : MENU_ICON;
    };
    menuButton.addEventListener("click", function () {
      setMenu(header.getAttribute("data-open") !== "true");
    });
    header.querySelectorAll(".hdr-nav a, .hdr-brand").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* Hero video play / pause */
  var toggle = document.querySelector(".hero-toggle");
  var video = document.querySelector(".hero-video");
  if (toggle && video) {
    var HERO_LABEL = " RTA \u00b7 1/3 octave \u00b7 dB SPL";
    var renderVideo = function (paused) {
      toggle.innerHTML = (paused ? "\u25b6" : "\u275a\u275a") + HERO_LABEL;
      toggle.setAttribute("aria-label", paused ? "Play sweep video" : "Pause sweep video");
    };
    toggle.addEventListener("click", function () {
      if (video.paused) {
        var playing = video.play();
        if (playing && playing.then) playing.then(function () { renderVideo(false); }).catch(function () { renderVideo(true); });
        else renderVideo(false);
      } else {
        video.pause();
        renderVideo(true);
      }
    });
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      renderVideo(true);
    }
  }

  /* Factory vs calibrated soundstage tabs (CSS does the visual switching) */
  document.querySelectorAll("[data-viz]").forEach(function (viz) {
    var tabs = viz.querySelectorAll('[role="tab"][data-set]');
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        viz.setAttribute("data-state", tab.getAttribute("data-set"));
        tabs.forEach(function (other) {
          other.setAttribute("aria-selected", String(other === tab));
        });
      });
    });
  });
})();
