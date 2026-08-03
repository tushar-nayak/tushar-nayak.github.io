---
layout: about
title: about
permalink: /
subtitle: researcher working at the intersection of surgical biomechanics, computer vision, and medical imaging
description: Research homepage for Tushar Nayak, focused on computer vision, medical imaging, and image-guided robotic intervention.

selected_papers: false # publications are linked below instead of rendered in full
social: false # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: false # adds a vertical scroll bar if there are more than 3 news items
  limit: 2 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 2 # leave blank to include all the blog posts
---

<section class="hero-panel">
  <div class="hero-panel__content">
    <p class="hero-panel__eyebrow">biomedical vision / robotic intervention</p>
    <h2 class="hero-panel__title">Recovering structure from incomplete clinical data.</h2>
    <p class="hero-panel__lead">
      I am a scientist at the <a href="https://surgbiomech.github.io">SurgBioMech / Pocivavsek Lab</a> at the <a href="https://www.uchicago.edu/">University of Chicago</a>. After completing my master's in Biomedical Engineering at Carnegie Mellon University, I continue working across medical imaging, geometric vision, and physics-aware learning to turn sparse measurements into useful anatomy, motion, and deformation estimates for surgical workflows.
    </p>
    <p class="hero-panel__signal">Current work: endovascular robotics, fluoroscopy-to-CTA deformable registration, sparse-view 3D reconstruction, and clinically grounded biomedical vision.</p>
    <div class="hero-panel__actions">
      <a class="hero-panel__action hero-panel__action--primary" href="{{ '/research/' | relative_url }}">View research <span aria-hidden="true">↗</span></a>
      <a class="hero-panel__action" href="{{ '/resume/tushar-nayak-resume.pdf' | relative_url }}">Download CV <span aria-hidden="true">↓</span></a>
    </div>
    <p class="hero-panel__contact">Abbott Memorial Hall · Chicago, IL</p>
  </div>
  <aside class="hero-panel__aside">
    <img class="hero-panel__portrait" src="{{ '/assets/img/prof_pic.jpg' | relative_url }}" alt="Portrait of Tushar Nayak">
    <p class="hero-panel__aside-title">Current focus</p>
    <ul class="hero-panel__list">
      <li>endovascular robotics and vessel deformation modeling</li>
      <li>registration from fluoroscopy and pre-operative CTA</li>
      <li>3D vision methods grounded in clinical constraints</li>
    </ul>
    <p class="hero-panel__aside-note">SurgBioMech / Pocivavsek Lab · Abbott Memorial Hall · University of Chicago</p>
  </aside>
</section>

<section class="section-shell now-block">
  <p class="section-shell__eyebrow">now</p>
  <div class="section-shell__grid">
    <div>
      <h2 class="section-shell__title">Scientist at the SurgBioMech / Pocivavsek Lab.</h2>
      <p class="section-shell__text">I work on surgical biomechanics, computer vision, and medical imaging at the University of Chicago, with a focus on geometry-aware methods for clinical data.</p>
    </div>
  </div>
</section>

<section class="section-shell">
  <p class="section-shell__eyebrow">research directions</p>
  <div class="section-shell__grid section-shell__grid--three">
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Intervention</p>
      <p class="section-shell__text">Image-guided robotic intervention, intra-operative deformation, and tele-operated surgical systems.</p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Vision</p>
      <p class="section-shell__text">Geometric vision, registration, 3D reconstruction, and learning models that stay tied to measurement and physics.</p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Biomedical ML</p>
      <p class="section-shell__text">Segmentation, multimodal learning, and clinically grounded modeling for noisy biomedical data.</p>
    </div>
  </div>
</section>

{% include featured_projects.liquid %}

<p class="home-section-link"><a class="hero-panel__action" href="{{ '/publications/' | relative_url }}">View publications <span aria-hidden="true">↗</span></a></p>
