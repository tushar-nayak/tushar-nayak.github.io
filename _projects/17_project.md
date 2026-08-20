---
layout: page
title: Gaussian Occupancy Cardiac Reconstruction
description: Reconstructs 3D cardiac anatomy from sparse echocardiography using differentiable Gaussian occupancy fields.
img: assets/img/gxa.png
importance: 2
category: personal projects
github: https://github.com/tushar-nayak/cardiac-reconstruction-evolved
website: https://tushar-nayak.github.io/cardiac-reconstruction-evolved/
status: active extension
tags: [3D Vision, Medical Imaging, Cardiac Reconstruction, Gaussian Fields]
featured: true
homepage_featured: true
homepage_order: 3
---

## project status: active extension

CardiacReconstruction-Evolved extends the sparse 2D echo to 3D reconstruction line into a stabilized Gaussian occupancy formulation.

The project uses differentiable slice supervision to align sparse echocardiographic views with a volumetric cardiac representation, then evaluates the recovered anatomy through mesh extraction and geometric metrics.

Core pieces:

- Stabilized 3D Gaussian occupancy fields for cardiac anatomy
- Differentiable projection losses from sparse echo slices
- Mesh extraction for interpretable surface evaluation
- Follow-on work from the few-shot cardiac reconstruction project
