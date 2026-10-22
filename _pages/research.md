---
layout: page
title: research
permalink: /research/
description: Research interests and project work in geometric computer vision, medical imaging, and image-guided intervention.
nav: true
nav_order: 1
horizontal: false
---

<section class="section-shell section-shell--intro">
  <p class="section-shell__eyebrow">research interests</p>
  <div class="section-shell__grid">
    <div>
      <h2 class="section-shell__title">Geometry-aware learning for medical image analysis.</h2>
      <p class="section-shell__text">
        I develop geometry-aware learning methods that recover 3D anatomy, motion, and deformation from sparse, noisy, or multimodal clinical observations. Across my work, clinically useful structure has to be inferred from measurements that are too few, too noisy, or too low-dimensional to determine it outright. Examples include a single fluoroscopic projection, three echocardiography slices, or a handful of irregularly sampled MRI timepoints.
      </p>
      <p class="section-shell__text">
        My approach is to treat geometry and physics as constraints rather than afterthoughts: representing anatomy explicitly, enforcing consistency with the imaging geometry that produced the observation, and building objectives that make implausible solutions expensive. I am most interested in continuing this line toward intra-operative systems where an estimate is only useful if it is both fast and physically trustworthy.
      </p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Current directions</p>
      <ul class="section-shell__list">
        <li>sparse-view 2D–3D reconstruction</li>
        <li>deformable anatomical modeling and registration</li>
        <li>neural implicit and Gaussian representations</li>
        <li>graph-based geometric learning</li>
        <li>physics- and geometry-informed methods for image-guided intervention</li>
      </ul>
    </div>
  </div>
</section>

{% include project_filter.liquid %}

<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
