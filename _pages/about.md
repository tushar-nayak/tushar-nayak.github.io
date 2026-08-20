---
layout: about
title: about
permalink: /
subtitle: building geometry-aware vision systems for image-guided robotic surgery
description: Research homepage for Tushar Nayak, focused on computer vision, medical imaging, and image-guided robotic intervention.

selected_papers: false
social: false

announcements:
  enabled: false
  scrollable: false
  limit: 1

latest_posts:
  enabled: false
  scrollable: false
  limit: 1

# The homepage is a lightweight overview and does not need these global helpers.
enable_masonry: false
enable_math: false
enable_medium_zoom: false
enable_publication_badges: false
enable_icon_fonts: false
enable_code_highlighting: false
enable_code_copy: false
enable_jupyter_links: false
enable_progressbar: false
enable_back_to_top: false
enable_mdb: false
enable_web_fonts: false
enable_common_scripts: false
enable_framework_scripts: false
---

<section class="hero-panel">
  <div class="hero-panel__content">
    <h2 class="hero-panel__title">Geometry-aware vision for image-guided robotic surgery.</h2>
    <p class="hero-panel__lead">
      I am a scientist at the <a href="https://surgbiomech.uchicago.edu">SurgBioMech / Pocivavsek Lab</a> at the <a href="https://www.uchicago.edu/">University of Chicago</a>. I build computer vision and learning systems that recover useful anatomy, motion, and deformation from sparse clinical data.
    </p>
    <div class="hero-panel__actions">
      <a class="hero-panel__action hero-panel__action--primary" href="{{ '/research/' | relative_url }}">View research <span aria-hidden="true">↗</span></a>
      <a class="hero-panel__action" href="{{ '/output/pdf/Tushar_Nayak_Resume.pdf' | relative_url }}">Download CV <span aria-hidden="true">↓</span></a>
    </div>
  </div>
  <aside class="hero-panel__aside">
    {% include figure.liquid loading="eager" fetchpriority="high" decoding="async" path="assets/img/prof_pic.jpg" sizes="(min-width: 769px) 260px, 224px" width="2005" height="2005" class="hero-panel__portrait" alt="Portrait of Tushar Nayak" %}
  </aside>
</section>

{% include featured_projects.liquid %}

<section class="section-shell">
  <div class="section-shell__heading-row">
    <p class="section-shell__eyebrow">research directions</p>
    <a class="section-shell__inline-link" href="{{ '/research/' | relative_url }}">research overview <span aria-hidden="true">↗</span></a>
  </div>
  <div class="section-shell__grid section-shell__grid--three">
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Intervention</p>
      <p class="section-shell__text">Image-guided robotic intervention, intra-operative deformation, and tele-operated surgical systems.</p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Vision</p>
      <p class="section-shell__text">Geometric vision, registration, and 3D reconstruction tied to measurement and physics.</p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">Biomedical ML</p>
      <p class="section-shell__text">Segmentation and multimodal learning designed around noisy, clinically constrained data.</p>
    </div>
  </div>
</section>

<section class="section-shell home-publications">
  <div class="section-shell__heading-row">
    <p class="section-shell__eyebrow">selected publications</p>
    <a class="section-shell__inline-link" href="{{ '/publications/' | relative_url }}">all publications <span aria-hidden="true">↗</span></a>
  </div>
  <div class="selected-publications__list">
    <a class="selected-publication" href="{{ '/assets/pdf/tusharn-poster.pdf' | relative_url }}">
      <span class="selected-publication__year">2026</span>
      <span class="selected-publication__title">Estimating neurovascular deformation during thrombectomy from 2D fluoroscopy</span>
      <span class="selected-publication__venue">poster <span aria-hidden="true">↗</span></span>
    </a>
    <a class="selected-publication" href="{{ '/publications/' | relative_url }}#basdeo2025review_robotics_neuroendovascular">
      <span class="selected-publication__year">2025</span>
      <span class="selected-publication__title">A review of robotics in autonomous and remote neuroendovascular intervention</span>
      <span class="selected-publication__venue">review <span aria-hidden="true">↗</span></span>
    </a>
    <a class="selected-publication" href="https://doi.org/10.1080/23311916.2024.2357182">
      <span class="selected-publication__year">2024</span>
      <span class="selected-publication__title">Automated histopathological detection and classification of lung cancer</span>
      <span class="selected-publication__venue">journal <span aria-hidden="true">↗</span></span>
    </a>
  </div>
</section>

<section class="section-shell home-feed">
  <div class="section-shell__heading-row">
    <p class="section-shell__eyebrow">technical writing</p>
    <a class="section-shell__inline-link" href="{{ '/blog/' | relative_url }}">all writing <span aria-hidden="true">↗</span></a>
  </div>
  {% include latest_posts.liquid %}
</section>

<section class="section-shell home-feed">
  <div class="section-shell__heading-row">
    <p class="section-shell__eyebrow">recent news</p>
    <a class="section-shell__inline-link" href="{{ '/news/' | relative_url }}">all news <span aria-hidden="true">↗</span></a>
  </div>
  {% include news.liquid limit=true %}
</section>

<section class="section-shell home-contact">
  <p class="section-shell__eyebrow">contact</p>
  <div class="home-contact__content">
    <p class="section-shell__text">Interested in medical imaging, surgical robotics, geometric vision, or research collaboration?</p>
    <a class="hero-panel__action" href="mailto:tusharn@uchicago.edu">tusharn@uchicago.edu <span aria-hidden="true">↗</span></a>
  </div>
</section>
