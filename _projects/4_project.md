---
layout: page
title: Few-Shot 2D Echo to 3D Cardiac Reconstruction via Neural Implicit Priors
description: Course Project for Learning for 3D Vision
img: assets/img/l3d1.png
importance: 3
category: course projects
github: https://github.com/tushar-nayak/cardiac-volume-reconstruction
website: https://tushar-nayak.github.io/cardiac-volume-reconstruction/
status: completed
tags: [3D Vision, Medical Imaging, Cardiac Reconstruction, Course Project]
featured: true
---

## summary

This course project built a framework for reconstructing patient-specific 3D ventricular geometry from sparse 2D echocardiography. The key idea was to combine a learned global shape prior with test-time refinement so the model could stay data-efficient without losing patient-specific detail.

## problem

Echocardiography is widely available, but most routine exams provide only a small number of 2D views. Recovering a high-fidelity 3D cardiac shape from that sparse data is hard because large parts of the anatomy are never directly observed.

## approach

The project supports three operating modes to balance speed and accuracy:

- **Local**: train a fresh INR from scratch for every patient
- **Global**: learn one shared prior across the training population
- **Mixed**: start from a global prior and refine it at test time on sparse patient-specific slices

The technical stack combines:

- **Representation**: coordinate-based MLP representing occupancy / signed-distance geometry
- **Differentiable rendering**: a vectorized projection layer mapping the 3D implicit shape to clinical slice planes
- **Pose refinement**: joint optimization of rigid slice pose and shape
- **Meta-learning**: a Reptile-style initialization that adapts quickly to new cardiac geometries

## result

- Test-time refinement significantly improved patient-specific reconstruction compared with static inference
- Population-level shape priors regularized anatomy in unobserved regions
- Automated slice selection improved the diagnostic consistency of the sparse views
- Evaluation used 3D Dice, IoU, and clinically meaningful ventricular volume estimates

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l3d1.png" title="Reconstruction" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l3d2.png" title="Middle Slice GT v/s Reconstruction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The method bridges the gap between widely available 2D ultrasound and expensive 3D imaging. By leveraging test-time optimization, the framework can recover plausible 3D meshes from as few as three standard views while keeping the final shape tied to the observed clinical data.

Collaborators: [Vivek Dhara](https://www.linkedin.com/in/vivek-dhara/) and [Vaibhav Parekh](https://www.linkedin.com/in/vaibhavparekh9/)

## limitations

- Reconstruction quality still depends on slice selection and pose quality
- Sparse-view supervision leaves some ambiguity in unobserved regions
- The framework is a research prototype rather than a clinically validated reconstruction tool

## next steps

- compare the hybrid mode more rigorously against newer Gaussian-field variants
- improve robustness to poor acquisition geometry
- evaluate on larger and more heterogeneous echo cohorts
