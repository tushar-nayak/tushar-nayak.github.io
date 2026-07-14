---
layout: page
title: research
permalink: /research/
nav: true
nav_order: 1
display_categories: [at carnegie mellon, at manipal, other]
horizontal: false
---

<!-- pages/projects.md -->
<section class="section-shell section-shell--intro">
  <p class="section-shell__eyebrow">research themes</p>
  <div class="section-shell__grid">
    <div>
      <h2 class="section-shell__title">Current work in image-guided intervention, medical imaging, and geometric learning.</h2>
      <p class="section-shell__text">
        These projects are grouped by where the work happened and what technical direction it served. The main thread is recovering useful structure from sparse, noisy, or clinically constrained visual data.
      </p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Core directions</p>
      <ul class="section-shell__list">
        <li>intra-operative deformation and registration</li>
        <li>3D reconstruction and anatomical modeling</li>
        <li>biomedical segmentation and multimodal learning</li>
      </ul>
    </div>
  </div>
</section>
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
