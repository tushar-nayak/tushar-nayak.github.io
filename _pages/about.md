---
layout: about
title: Tushar Nayak
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

<section class="minimal-intro">
  {% include figure.liquid loading="eager" fetchpriority="high" decoding="async" path="assets/img/prof_pic.jpg" sizes="(min-width: 769px) 200px, 140px" width="2005" height="2005" class="minimal-intro__portrait" alt="Portrait of Tushar Nayak" %}
  <div>
    <p class="minimal-intro__bio">I am a staff scientist at the <a href="https://surgbiomech.uchicago.edu">Surgical Biomechanics Lab</a> at the University of Chicago. I collaborate with the University of Pittsburgh's <a href="https://surreality.pitt.edu">Surreality Lab</a> and Carnegie Mellon University's <a href="https://cerlab.cmu.edu">Computational Engineering &amp; Robotics Lab (CERLAB)</a>, where I am also an alumnus.</p>
    <p class="minimal-intro__lead">I build computer vision and learning systems that recover anatomy, motion, and deformation from sparse clinical data, with applications in medical imaging and image-guided robotic intervention.</p>
    <p class="minimal-intro__links"><a href="https://github.com/tushar-nayak/cv/blob/main/tushar-nayak-cv.pdf" target="_blank" rel="noopener noreferrer">CV</a><a href="mailto:tusharnayak128@gmail.com">Email</a><a href="https://www.linkedin.com/in/nayaktushar" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://x.com/tusharnayak_" target="_blank" rel="noopener noreferrer">Twitter</a></p>
  </div>
</section>

<section class="minimal-section">
  <div class="minimal-section__heading"><h2>Featured Projects</h2><div class="minimal-section__links"><a href="{{ '/projects/' | relative_url }}">All projects</a><a href="https://github.com/{{ site.data.socials.github_username }}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> GitHub</a></div></div>
  <div class="minimal-list minimal-list--projects">
    {% assign homepage_featured = site.projects | where: 'homepage_featured', true | sort: 'homepage_order' %}
    {% for project in homepage_featured limit: 4 %}
      <a class="minimal-list__row" href="{{ project.url | relative_url }}"><span class="minimal-list__title">{{ project.homepage_title | default: project.title }}</span><span class="minimal-list__description">{{ project.description }}</span></a>
    {% endfor %}
  </div>
</section>

<section class="minimal-section">
  <div class="minimal-section__heading"><h2>Recent Publications</h2><div class="minimal-section__links"><a href="{{ '/publications/' | relative_url }}">All publications</a><a href="https://scholar.google.com/citations?user={{ site.data.socials.scholar_userid }}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i> Google Scholar</a></div></div>
  <div class="minimal-list minimal-list--papers">
    <a class="minimal-list__row" href="{{ '/publications/' | relative_url }}#kite2026systematic_review_glioma_recurrence"><span class="minimal-list__year">2026</span><span class="minimal-list__title">The Use of Artificial Intelligence and Machine Learning to Predict Tumor Recurrence in High-Grade Gliomas: A Systematic Review</span><span class="minimal-list__description">Neurosurgical Review</span></a>
    <a class="minimal-list__row" href="{{ '/publications/' | relative_url }}#nayak2026elsr_workshop"><span class="minimal-list__year">2026</span><span class="minimal-list__title">Toward Real-Time 3D Vascular State Estimation from Monocular Fluoroscopy for Endovascular Robotic Surgery</span><span class="minimal-list__description">IROS 2026 · ELSR Workshop</span></a>
    <a class="minimal-list__row" href="{{ '/publications/' | relative_url }}#basdeo2025review_robotics_neuroendovascular"><span class="minimal-list__year">2025</span><span class="minimal-list__title">A Review of Robotics in Achieving Autonomous and Remote Neuroendovascular Intervention</span><span class="minimal-list__description">Under review</span></a>
  </div>
</section>

<section class="minimal-section minimal-section--news">
  <div class="minimal-section__heading"><h2>Recent news</h2><a href="{{ '/news/' | relative_url }}">All news</a></div>
  <div class="minimal-list minimal-list--news">
    {% assign recent_news = site.news | sort: 'date' | reverse %}
    {% for item in recent_news limit: 3 %}
      <div class="minimal-list__row"><span class="minimal-list__year">{{ item.date | date: '%b %Y' }}</span><span class="minimal-list__title">{{ item.content | markdownify | strip_html | strip }}</span></div>
    {% endfor %}
  </div>
</section>
