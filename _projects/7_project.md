---
layout: page
title: Monkeypox Virus Detection Using Skin Lesion Images
description: Preliminary project at Biomedical Computing Lab
img: assets/img/mpxc.png
importance: 1
category: at manipal
status: published
tags: [Medical Imaging, Dermatology, Classification, Explainable AI]
related_publications: true
---

---

## Project Status: Completed

Built unified deep learning pipelines for automated monkeypox detection, handling both binary classification (Mpox vs. others) {% cite nayak2023deep %} and multiclass (Mpox, Chickenpox, Measles, Healthy) {% cite nayak2023detection %} tasks from skin lesion images. Leveraged curated Kaggle datasets, enriching them with extensive augmentation methods for better model robustness. Used transfer learning to deploy ResNet-18, ResNet-50, ResNet-101, and SqueezeNet architectures in MATLAB, experimenting on consumer GPUs with careful tuning of mini-batch size and learning rate to maximize accuracy.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mpxn.png" title="class activation map visualization of each modality" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    .
</div>

For binary detection, models hit up to 99.5% accuracy and F1 score, and for multiclass labeling, reached 91% accuracy and a 92.6% F1 on Mpox. The approach included explainable AI (LIME, GradCAM), letting clinicians see the reasoning behind predictions, not just black-box outputs. These solutions were coded and optimized to run efficiently on regular laptops and phones, so they fit real-world, potentially low-resource contexts where quick diagnostics are needed and PCR isn't available. Extensive benchmarking showed these approaches are competitive—with accuracy and speed to rival or outperform existing literature—while still being practical and interpretable for the healthcare setting.
