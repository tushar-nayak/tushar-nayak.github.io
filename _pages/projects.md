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

This page is organized as a research chronology rather than a flat portfolio. The project links are the same, but the framing follows how my work evolved across institutions, methods, and application domains.

{% include project_filter.liquid %}

{% assign manipal_projects = site.projects | where: "category", "at manipal" | sort: "importance" %}
{% assign course_projects = site.projects | where: "category", "course projects" | sort: "importance" %}
{% assign cmu_projects = site.projects | where: "category", "at carnegie mellon" | sort: "importance" %}
{% assign personal_projects = site.projects | where: "category", "personal projects" | sort: "importance" %}

<div class="research-chronology">
  <section class="chronology-stage">
    <div class="chronology-stage__rail">
      <p class="chronology-stage__eyebrow">Phase 1</p>
      <h2>Foundations at Manipal</h2>
      <p class="chronology-stage__summary">The starting point was biomedical computing and medical image analysis work centered on pathology, lesion analysis, and early multimodal diagnostic modeling.</p>
    </div>
    <div class="chronology-stage__content">
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in manipal_projects %}
          {% assign tag_string = project.tags | join: "," %}
          <div
            class="col mb-4 pf-item"
            data-filter-tags="{{ tag_string }}"
          >
            {% include projects_horizontal.liquid %}
          </div>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="chronology-stage">
    <div class="chronology-stage__rail">
      <p class="chronology-stage__eyebrow">Phase 2</p>
      <h2>Coursework and Method Building</h2>
      <p class="chronology-stage__summary">Course-driven projects became a sandbox for reconstruction, segmentation, alignment, denoising, and representation learning, with more deliberate focus on geometry and clinically relevant imaging tasks.</p>
    </div>
    <div class="chronology-stage__content">
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in course_projects %}
          {% assign tag_string = project.tags | join: "," %}
          <div
            class="col mb-4 pf-item"
            data-filter-tags="{{ tag_string }}"
          >
            {% include projects_horizontal.liquid %}
          </div>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="chronology-stage">
    <div class="chronology-stage__rail">
      <p class="chronology-stage__eyebrow">Phase 3</p>
      <h2>Carnegie Mellon Research</h2>
      <p class="chronology-stage__summary">The work then narrowed toward image-guided robotic intervention, with projects in deformation estimation, registration, and predictive modeling for clinically grounded robotic systems.</p>
    </div>
    <div class="chronology-stage__content">
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in cmu_projects %}
          {% assign tag_string = project.tags | join: "," %}
          <div
            class="col mb-4 pf-item"
            data-filter-tags="{{ tag_string }}"
          >
            {% include projects_horizontal.liquid %}
          </div>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="chronology-stage">
    <div class="chronology-stage__rail">
      <p class="chronology-stage__eyebrow">Phase 4</p>
      <h2>Current Independent Directions</h2>
      <p class="chronology-stage__summary">The current phase expands into active research prototypes across surgical vision, 3D reconstruction, pathology, segmentation benchmarks, and tool-aware medical AI systems.</p>
    </div>
    <div class="chronology-stage__content">
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in personal_projects %}
          {% assign tag_string = project.tags | join: "," %}
          <div
            class="col mb-4 pf-item"
            data-filter-tags="{{ tag_string }}"
          >
            {% include projects_horizontal.liquid %}
          </div>
        {% endfor %}
      </div>
    </div>
  </section>
</div>
