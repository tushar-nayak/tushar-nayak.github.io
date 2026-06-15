---
layout: about
title: about
permalink: /
subtitle: computer vision focused biomedical engineer turned roboticist working in robotic surgery
description: Research homepage for Tushar Nayak, focused on computer vision, medical imaging, and image-guided robotic intervention.

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Pittsburgh PA</p>

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
    <p class="hero-panel__eyebrow">tushar nayak · carnegie mellon university</p>
    <h2 class="hero-panel__title">Computer vision for image-guided robotic intervention.</h2>
    <p class="hero-panel__lead">
      I am a graduate student at <a href="https://www.cmu.edu/">Carnegie Mellon University</a>, pursuing a research-oriented master's in <a href="https://www.cmu.edu/bme/">Biomedical Engineering</a>, advised by <a href="https://www.meche.engineering.cmu.edu/directory/bios/shimada-kenji.html">Professor Kenji Shimada</a> at the <a href="https://cerlab.cmu.edu">Computational Engineering & Robotics Lab</a>.
    </p>
    <p class="hero-panel__lead">
      My work combines medical imaging, geometric vision, and physics-aware learning models to recover structure, motion, and deformation from sparse clinical data for surgical and biomedical workflows.
    </p>
    <div class="hero-panel__actions">
      <a class="hero-panel__action" href="{{ '/research/' | relative_url }}">Research</a>
      <a class="hero-panel__action" href="{{ '/cv/' | relative_url }}">CV</a>
      <a class="hero-panel__action" href="mailto:tusharn@andrew.cmu.edu">Contact</a>
    </div>
  </div>
  <aside class="hero-panel__aside">
    <p class="hero-panel__aside-title">Current focus</p>
    <ul class="hero-panel__list">
      <li>endovascular robotics and vessel deformation modeling</li>
      <li>registration from fluoroscopy and pre-operative CTA</li>
      <li>3D vision methods grounded in clinical constraints</li>
    </ul>
    <p class="hero-panel__aside-note">
      Based in Pittsburgh. You can reach me at tusharn [at] andrew [dot] cmu [dot] edu or find me in the Steffey Robotics Lab space at <a href="https://maps.app.goo.gl/Vau7Cu9NhYost5q7A">Scaife Hall</a>.
    </p>
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

<details>
  <summary>Read more...</summary>
  
 I work on the vision sub-system of a haptically enabled endovascular robotic tele-surgerical platform as part of my masters thesis with doctoral candidate <a href="https://www.rishibasdeo.com/">Rishi Basdeo</a>. My main area of focus is investigating physics informed neural networks and neural ordinary differential equations to quantify deformation from 2D fluroscopy angiograms and register the deformation to the pre-operative computer tomography angiographs.

<br><br>

Before Pittsburgh, I completed my undergrad at
<a href="https://www.manipal.edu/mit.html">Manipal Institute of Technology</a>
with a major in
<a href="https://www.manipal.edu/mit/department-faculty/department-list/biomedical.html">Biomedical Engineering</a>,
focusing on pattern recognition and image processing, and a minor in Data Science.
Over the second half of my undergrad, I worked under
<a href="https://researcher.manipal.edu/en/persons/niranjana-s">Professor Niranjana S</a>
and
<a href="https://researcher.manipal.edu/en/persons/krishnaraj-chadaga">Dr. Krishnaraj Chadaga</a>
at the Biomedical Computing Lab on projects ranging from skin lesion image-based viral infection detection to multi-stage and multi-modal cancer detection.

<br><br>

Between my bachelors and masters, I also spent a year as a researcher at
<a href="https://www.iith.ac.in/">IIT Hyderabad</a>
working on motion-capture & electromyography analysis for exercise and the
<a href="https://www.icmr.gov.in/">Indian Council of Medical Research</a>
where I worked on an ultrasound-based fetal anomaly system.

<br><br>

Besides lab-work, I'm also usually giving/boring people with my usual spiel as one of the
<a href="https://www.cmu.edu/bme/Admissions/resources/tushar-nayak-ambassador-pdf.pdf">BME department's ambassador</a>,
going trailbiking, playing the piano or continuing work on this website!

</details>
