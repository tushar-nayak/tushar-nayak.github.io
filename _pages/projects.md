---
layout: page
title: projects
permalink: /projects/
description: Selected technical projects spanning medical imaging, computer vision, geometric modeling, and robotic intervention.
nav: true
nav_order: 3
horizontal: false
---

<!-- pages/projects.md -->

<section class="section-shell section-shell--intro">
  <p class="section-shell__eyebrow">project archive</p>
  <div class="section-shell__grid">
    <div>
      <h2 class="section-shell__title">Technical work organized as case studies instead of thumbnails.</h2>
      <p class="section-shell__text">
        This page collects research systems, medical imaging pipelines, and side builds that were substantial enough to deserve their own write-up. Each entry is meant to show the problem, the method, and the current result or status.
      </p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">What to expect</p>
      <ul class="section-shell__list">
        <li>medical imaging, robotics, and geometric vision</li>
        <li>ongoing research mixed with smaller independent builds</li>
        <li>filters by topic, with direct links to the full project page</li>
      </ul>
    </div>
  </div>
</section>

{% include project_filter.liquid %}

<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% assign tag_string = project.tags | join: "," %}
      <div
        class="col pf-item"
        data-filter-tags="{{ tag_string }}"
      >
        <a href="{% if project.redirect %}{{ project.redirect }}{% else %}{{ project.url | relative_url }}{% endif %}">
          <div class="card h-100 hoverable">
            {% if project.img %}
              {%
                include figure.liquid
                loading="eager"
                path=project.img
                sizes="250px"
                alt="project thumbnail"
                class="card-img-top"
              %}
            {% endif %}
            <div class="card-body">
              <h2 class="card-title">{{ project.title }}</h2>
              {% if project.status or project.tags %}
                <div class="project-card-meta">
                  {% if project.status %}
                    <span class="project-card-status">{{ project.status }}</span>
                  {% endif %}
                  {% for tag in project.tags limit: 3 %}
                    <span class="project-card-tag">{{ tag }}</span>
                  {% endfor %}
                </div>
              {% endif %}
              <p class="card-text">{{ project.description }}</p>
            </div>
          </div>
        </a>
      </div>
    {% endfor %}
  </div>
</div>
