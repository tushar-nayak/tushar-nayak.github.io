---
layout: page
title: Multi-Model Oral Squamous Cell Carcinoma Detection
description: Undergraduate thesis
img: assets/img/oscc.jpg
importance: 3
category: at manipal
status: completed
tags: [Pathology, Cancer Detection, Deep Learning, Undergraduate Thesis]
---

---

## project status: completed

What turned into my undergraduate thesis, this a novel deep learning-based tri-modal, multi-stage system for detecting oral squamous cell carcinoma (OSCC) by integrating non-invasive oral lesion images, optical coherence tomography (OCT) scans, and invasive histopathology images, each analyzed by specialized convolutional neural networks employing regularized transfer learning, attention mechanisms, and ensemble methods.

The system demonstrates high diagnostic performance, with F1-scores above 0.91 for each modality (0.99 for lesion images, 0.91 for OCT, and 0.97 for histopathology), and leverages explainable AI techniques like Grad-CAM and Score-CAM to provide visual insights into model decisions, enhancing interpretability and clinical trust.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/oscc2.png" title="class activation map visualization of each modality" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    .
</div>

Extensive data pre-processing and augmentation were used to maximize model robustness, and the results show that this comprehensive approach matches or exceeds the best published results for each imaging modality, supporting its potential to improve early, accurate, and efficient OSCC diagnosis in real-world healthcare settings.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/osccnet.png" title="class activation map visualization of each modality" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    .
</div>
