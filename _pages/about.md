---
layout: about
title: about
permalink: /
subtitle: researcher working at the intersection of surgical biomechanics, computer vision, and medical imaging
description: Research homepage for Tushar Nayak, focused on computer vision, medical imaging, and image-guided robotic intervention.

selected_papers: true # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: false # adds a vertical scroll bar if there are more than 3 news items
  limit: 2 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
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
      <button type="button" class="hero-panel__action" id="bio-more-trigger" aria-haspopup="dialog" aria-controls="bio-more-dialog">Read more...</button>
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

{% include research_map.liquid %}

{% include featured_projects.liquid %}

<dialog id="bio-more-dialog" class="bio-modal">
  <form method="dialog" class="bio-modal__close-row">
    <button type="submit" class="bio-modal__close" aria-label="Close">&times;</button>
  </form>
  <div class="bio-modal__body">
    <p>During my master's at Carnegie Mellon University, I worked on the vision subsystem of a haptically enabled endovascular robotic tele-surgical platform with doctoral candidate <a href="https://www.rishibasdeo.com/">Rishi Basdeo</a>. My work investigated physics-informed neural networks and neural ordinary differential equations for quantifying deformation from 2D fluoroscopy angiograms and registering it to pre-operative computed tomography angiograms.</p>

    <p>Before Pittsburgh, I completed my undergrad at
    <a href="https://www.manipal.edu/mit.html">Manipal Institute of Technology</a>
    with a major in
    <a href="https://www.manipal.edu/mit/department-faculty/department-list/biomedical.html">Biomedical Engineering</a>,
    focusing on pattern recognition and image processing, and a minor in Data Science.
    Over the second half of my undergrad, I worked under
    <a href="https://researcher.manipal.edu/en/persons/niranjana-s">Professor Niranjana S</a>
    and
    <a href="https://researcher.manipal.edu/en/persons/krishnaraj-chadaga">Dr. Krishnaraj Chadaga</a>
    at the Biomedical Computing Lab on projects ranging from skin lesion image-based viral infection detection to multi-stage and multi-modal cancer detection.</p>

    <p>Between my bachelors and masters, I also spent a year as a researcher at
    <a href="https://www.iith.ac.in/">IIT Hyderabad</a>
    working on motion-capture & electromyography analysis for exercise and the
    <a href="https://www.icmr.gov.in/">Indian Council of Medical Research</a>
    where I worked on an ultrasound-based fetal anomaly system.</p>

    <p>Besides lab work, I am also usually giving/boring people with my usual spiel as one of the
    <a href="https://www.cmu.edu/bme/Admissions/resources/tushar-nayak-ambassador-pdf.pdf">BME department's ambassador</a>,
    going trailbiking, playing the piano or continuing work on this website!</p>

  </div>
</dialog>

<script defer src="{{ '/assets/js/bio_modal.js' | relative_url | bust_file_cache }}" type="text/javascript"></script>
