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
      I am a staff scientist at the <a href="https://surgbiomech.uchicago.edu">Surgical Biomechanics Lab</a> under Dr. Luka Pocivavsek at the <a href="https://www.uchicago.edu/">University of Chicago</a>, and a research collaborator with the <a href="https://www.pitt.edu/">University of Pittsburgh</a>'s Surreality Lab. I recently completed my M.S. in Biomedical Engineering at Carnegie Mellon University, where I build computer vision and learning systems that recover useful anatomy, motion, and deformation from sparse clinical data.
    </p>
    <div class="hero-panel__actions">
      <a class="hero-panel__action hero-panel__action--primary" href="{{ '/research/' | relative_url }}">View research <span aria-hidden="true">↗</span></a>
      <a class="hero-panel__action" href="https://github.com/tushar-nayak/cv/blob/main/tushar-nayak-cv.pdf">Download CV <span aria-hidden="true">↓</span></a>
    </div>
  </div>
  <aside class="hero-panel__aside">
    {% include figure.liquid loading="eager" fetchpriority="high" decoding="async" path="assets/img/prof_pic.jpg" sizes="(min-width: 769px) 260px, 224px" width="2005" height="2005" class="hero-panel__portrait" alt="Portrait of Tushar Nayak" %}
  </aside>
</section>

{% include featured_projects.liquid %}

<section class="section-shell home-publications">
  <div class="section-shell__heading-row">
    <p class="section-shell__eyebrow">selected publications</p>
    <a class="section-shell__inline-link" href="{{ '/publications/' | relative_url }}">all publications <span aria-hidden="true">↗</span></a>
  </div>
  <div class="selected-publications__list">
    <a class="selected-publication" href="{{ '/publications/' | relative_url }}#kite2026systematic_review_glioma_recurrence">
      <span class="selected-publication__year">2026</span>
      <span class="selected-publication__title">The Use of Artificial Intelligence and Machine Learning to Predict Tumor Recurrence in High-Grade Gliomas: A Systematic Review</span>
      <span class="selected-publication__venue">Neurosurgical Review <span aria-hidden="true">↗</span></span>
    </a>
    <a class="selected-publication" href="{{ '/publications/' | relative_url }}#nayak2026elsr_workshop">
      <span class="selected-publication__year">2026</span>
      <span class="selected-publication__title">Toward Real-Time 3D Vascular State Estimation from Monocular Fluoroscopy for Endovascular Robotic Surgery</span>
      <span class="selected-publication__venue">IROS 2026 <span aria-hidden="true">↗</span></span>
    </a>
    <a class="selected-publication" href="{{ '/publications/' | relative_url }}#basdeo2025review_robotics_neuroendovascular">
      <span class="selected-publication__year">2025</span>
      <span class="selected-publication__title">A Review of Robotics in Achieving Autonomous and Remote Neuroendovascular Intervention</span>
      <span class="selected-publication__venue">under review <span aria-hidden="true">↗</span></span>
    </a>
  </div>
</section>

<section class="section-shell home-contact">
  <p class="section-shell__eyebrow">contact</p>
  <div class="home-contact__content">
    <p class="section-shell__text">Interested in medical imaging, surgical robotics, geometric vision, or research collaboration?</p>
    <a class="hero-panel__action" href="mailto:tusharnayak128@gmail.com">tusharnayak128@gmail.com <span aria-hidden="true">↗</span></a>
  </div>
</section>
