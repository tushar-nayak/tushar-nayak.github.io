---
layout: page
permalink: /repositories/
title: repositories
description: Selected GitHub repositories and codebases.
nav: true
nav_order: 5
---

This page collects the main public repositories behind my project work, experiments, and website.
For a broader project overview with descriptions and results, see the [projects](/projects/) page.

<p>
  <a class="btn btn-sm z-depth-0" href="https://github.com/tushar-nayak" role="button" target="_blank" rel="noopener noreferrer">
    <i class="fa-brands fa-github"></i>
    <span>View GitHub Profile</span>
  </a>
</p>

{% if site.data.repositories.github_users %}

  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center mb-4">
    {% for user in site.data.repositories.github_users %}
      {% include repository/repo_user.liquid username=user %}
    {% endfor %}
  </div>
{% endif %}

<!-- Contribution calendar for tushar-nayak -->
<div class="contrib-graph">
  <p class="contrib-graph__eyebrow">Activity</p>
  <h2 class="contrib-graph__title">Contribution calendar &thinsp;<span class="contrib-graph__year" id="cg-year"></span></h2>
  <div class="contrib-graph__wrap">
    <div class="contrib-graph__loading" id="cg-loading" aria-live="polite">Loading contribution data…</div>
    <div class="contrib-graph__canvas-wrap" id="cg-canvas-wrap" style="display:none">
      <div class="contrib-graph__months" id="cg-months" aria-hidden="true"></div>
      <div class="contrib-graph__body">
        <div class="contrib-graph__days" aria-hidden="true">
          <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
        </div>
        <div class="contrib-graph__grid" id="cg-grid" role="img" aria-label="GitHub contribution calendar for tushar-nayak"></div>
      </div>
      <div class="contrib-graph__footer" style="justify-content: flex-end;">
        <div class="contrib-graph__legend" aria-label="Contribution level legend">
          <span>Less</span>
          <span class="cg-cell" data-level="0"></span>
          <span class="cg-cell" data-level="1"></span>
          <span class="cg-cell" data-level="2"></span>
          <span class="cg-cell" data-level="3"></span>
          <span class="cg-cell" data-level="4"></span>
          <span>More</span>
        </div>
      </div>
    </div>
    <p class="contrib-graph__error" id="cg-error" style="display:none">Could not load contribution data.</p>
  </div>
</div>

<script>
(function () {
  "use strict";

  var USERNAME = "tushar-nayak";
  var API = "https://github-contributions-api.jogruber.de/v4/" + USERNAME + "?y=last";

  // GitHub's exact colour palettes
  var LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  var DARK  = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  function isDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function palette() { return isDark() ? DARK : LIGHT; }

  // Group flat contributions array into week columns [col][row]
  function toWeeks(contributions) {
    var weeks = [];
    var week  = [];
    contributions.forEach(function (day) {
      var dow = new Date(day.date + "T12:00:00").getDay(); // 0=Sun
      if (dow === 0 && week.length) { weeks.push(week); week = []; }
      week.push(day);
    });
    if (week.length) weeks.push(week);
    return weeks;
  }

  function buildGrid(contributions) {
    var grid  = document.getElementById("cg-grid");
    var mWrap = document.getElementById("cg-months");
    var wrap  = document.getElementById("cg-canvas-wrap");
    var load  = document.getElementById("cg-loading");
    var yrEl  = document.getElementById("cg-year");

    if (!grid) return;

    var pal   = palette();
    var weeks = toWeeks(contributions);
    var cells = [];

    // Month label positions
    var monthCols = {};
    weeks.forEach(function (week, wi) {
      week.forEach(function (day) {
        var m = new Date(day.date + "T12:00:00").getMonth();
        if (monthCols[m] === undefined) monthCols[m] = wi;
      });
    });

    // Render month headers
    mWrap.innerHTML = "";
    // Build spacer + labels aligned to week columns
    var totalWeeks = weeks.length;
    Object.keys(monthCols).sort(function(a,b){return monthCols[a]-monthCols[b];}).forEach(function(m, i, arr) {
      var col  = monthCols[m];
      var nextCol = arr[i + 1] !== undefined ? monthCols[arr[i + 1]] : totalWeeks;
      if (nextCol - col < 2) return; // skip cramped labels
      var span = document.createElement("span");
      span.textContent = MONTHS[m];
      span.style.gridColumn = (col + 1) + " / span " + (nextCol - col);
      mWrap.appendChild(span);
    });

    // Render grid cells
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = "repeat(" + weeks.length + ", var(--cg-cell-size))";

    weeks.forEach(function (week) {
      var col = document.createElement("div");
      col.className = "cg-col";
      // Pad top if first week doesn't start on Sunday
      if (weeks.indexOf(week) === 0 && week.length < 7) {
        var firstDow = new Date(week[0].date + "T12:00:00").getDay();
        for (var p = 0; p < firstDow; p++) {
          var pad = document.createElement("span");
          pad.className = "cg-cell cg-cell--pad";
          col.appendChild(pad);
        }
      }
      week.forEach(function (day) {
        var cell = document.createElement("span");
        cell.className = "cg-cell";
        cell.setAttribute("data-level", day.level);
        cell.setAttribute("data-date", day.date);
        cell.setAttribute("data-count", day.count);
        cell.style.backgroundColor = pal[day.level] || pal[0];
        cell.setAttribute("title", day.count + " contribution" + (day.count !== 1 ? "s" : "") + " on " + day.date);
        cells.push(cell);
        col.appendChild(cell);
      });
      grid.appendChild(col);
    });

    // Year label
    if (contributions.length) {
      var y = contributions[contributions.length - 1].date.slice(0, 4);
      if (yrEl) yrEl.textContent = y;
    }

    // Show
    load.style.display = "none";
    wrap.style.display = "";

    // Re-colour on theme toggle
    function recolour() {
      var p = palette();
      cells.forEach(function (cell) {
        var lvl = parseInt(cell.getAttribute("data-level"), 10) || 0;
        cell.style.backgroundColor = p[lvl] || p[0];
      });
    }

    // Watch for theme changes via MutationObserver on <html>
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === "data-theme") recolour();
      });
    }).observe(document.documentElement, { attributes: true });
  }

  function init() {
    fetch(API)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        buildGrid(data.contributions || []);
      })
      .catch(function () {
        var load = document.getElementById("cg-loading");
        var err  = document.getElementById("cg-error");
        if (load) load.style.display = "none";
        if (err)  err.style.display  = "";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
</script>

{% if site.data.repositories.github_repos %}

  <h2>Selected repositories</h2>

  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% for repo in site.data.repositories.github_repos %}
      {% include repository/repo.liquid repository=repo %}
    {% endfor %}
  </div>
{% endif %}
