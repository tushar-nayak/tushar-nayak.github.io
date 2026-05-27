---
layout: page
title: projects
permalink: /projects/
description: #expanding on my homepage...
nav: true
nav_order: 3
horizontal: false
---

<!-- pages/projects.md -->

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
