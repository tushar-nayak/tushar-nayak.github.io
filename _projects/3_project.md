---
layout: page
title: neural correlates associated to images for emtional response in fMRI
description: final project for course - fundamentals of mri and neuroimaging analysis
img: assets/img/fmri.png
# redirect: https://unsplash.com
importance: 3
category: at carnegie mellon
---

project status: completed (september - december 2024)
Full report [:link:](https://tushar-nayak.github.io/assets/pdf/42668.pdf) [Project Report](https://tushar-nayak.github.io/assets/pdf/42668.pdf)

This project maps how the brain processes emotionally positive, negative, and neutral images using a multimodal fMRI workflow on a 3T Siemens Prisma, combining structural MRI, resting-state fMRI, task-based BOLD, and ASL perfusion to link anatomy, connectivity, and blood flow with stimulus-driven responses. The functional task presented 100 images (40 positive, 40 negative, 20 neutral) with 8-second events and GLM analysis using a double-gamma HRF, alongside structural brain extraction/segmentation (T1/T2), ICA of resting-state data, and pCASL-based perfusion quantification.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ica1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ica2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    results from the independent component analysis
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/glm.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    general linear model
</div>

Key outcomes were clean structural segmentations supporting downstream alignment, GLM contrasts referencing amygdala and ventral striatum masks, and perfusion estimates of 101.47 ml/100g/min (grey matter), 80.78 ml/100g/min (white matter; elevated likely from partial volume), and 118.06 ml/100g/min (CSF; likely noise contamination), demonstrating a full pipeline from acquisition to quantitative interpretation of emotion-related brain function.