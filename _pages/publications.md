---
layout: page
permalink: /publications/
title: publications
description: Publications, conference papers, and journal articles by Tushar Nayak across medical imaging, biomedical AI, and computer vision.
nav: true
nav_order: 3
---

<section class="section-shell section-shell--intro">
  <p class="section-shell__eyebrow">publication overview</p>
  <div class="section-shell__grid">
    <div>
      <h2 class="section-shell__title">Papers across medical imaging, biomedical AI, and clinically oriented computer vision.</h2>
      <p class="section-shell__text">
        The publication list spans pathology, dermatology, infectious disease screening, and imaging-based diagnosis. The common thread is building practical image-analysis systems that can still hold up under clinical constraints and limited deployment settings.
      </p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">selected first</p>
      <ul class="section-shell__list">
        <li><a href="https://doi.org/10.1080/23311916.2024.2357182">lung cancer histopathology classification</a></li>
        <li><a href="https://doi.org/10.1016/j.medntd.2023.100243">binary mpox detection from lesion images</a></li>
        <li><a href="https://doi.org/10.1109/ACCESS.2024.3378516">dengue detection from blood smears</a></li>
      </ul>
    </div>
  </div>
</section>

<section class="section-shell">
  <p class="section-shell__eyebrow">selected publications</p>
  <div class="section-shell__grid section-shell__grid--three">
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">lung-2024</p>
      <p class="section-shell__text">Automated lung cancer subtype detection from histopathology with stain-robust preprocessing and spatial attention for reliable classification.</p>
      <p class="section-nav"><a href="https://doi.org/10.1080/23311916.2024.2357182">journal article</a></p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">mpox-2023</p>
      <p class="section-shell__text">Practical lesion-image screening for monkeypox using efficient transfer learning models and explainability methods suitable for low-resource deployment.</p>
      <p class="section-nav"><a href="https://doi.org/10.1016/j.medntd.2023.100243">journal article</a></p>
    </div>
    <div class="section-shell__panel">
      <p class="section-shell__panel-title">dengue-2024</p>
      <p class="section-shell__text">Explainable dengue detection from peripheral blood smear images, combining transfer learning with GradCAM-based inspection of decision regions.</p>
      <p class="section-nav"><a href="https://doi.org/10.1109/ACCESS.2024.3378516">journal article</a></p>
    </div>
  </div>
</section>

<div class="pub-profile-links">
  <a
    class="pub-profile-btn pub-profile-btn--scholar"
    href="https://scholar.google.com/citations?user=9xUX7NoAAAAJ&hl=en"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="View Google Scholar profile"
  >
    <i class="fas fa-graduation-cap pub-profile-btn__icon"></i>
    <span class="pub-profile-btn__text">Google Scholar</span>
    <i class="fas fa-arrow-up-right-from-square pub-profile-btn__external"></i>
  </a>

<a
class="pub-profile-btn pub-profile-btn--orcid"
href="https://orcid.org/0000-0002-4328-7983"
target="\_blank"
rel="noopener noreferrer"
aria-label="View ORCID profile"

>

    <i class="ai ai-orcid pub-profile-btn__icon"></i>
    <span class="pub-profile-btn__text">ORCID</span>
    <i class="fas fa-arrow-up-right-from-square pub-profile-btn__external"></i>

  </a>
</div>

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

<section class="section-shell">
  <p class="section-shell__eyebrow">under review</p>
</section>

{% bibliography --query @unpublished* %}

<section class="section-shell">
  <p class="section-shell__eyebrow">forum presentations</p>
</section>

{% bibliography --query @misc* %}

<section class="section-shell">
  <p class="section-shell__eyebrow">published work</p>
</section>

{% bibliography --query @article|@inproceedings|@incollection* %}

</div>
