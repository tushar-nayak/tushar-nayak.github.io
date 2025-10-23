---
layout: page
title: Sparse 2D Echocardiography to 3D Cardiac Reconstruction with Pose Refinement
description: Course Project for Learning for 3D Vision
img:
importance: 3
category: at carnegie mellon
---

---
project status: working (september 2025 - present)
---

This project develops a lightweight pipeline to reconstruct patient-specific 3D left and right ventricular shapes from sparse 2D echocardiography views. Using implicit neural representations with alternating pose estimation and shape refinement, we focus on end-diastolic and end-systolic frames for clinical volume and ejection fraction estimation.

## Technical Approach

This method alternates between estimating slice poses and refining a 3D implicit shape representation, trained primarily with 2D contour supervision:

- **Inputs**: Segmented 2D echocardiography planes (A2C, A4C, PSAX-mid) at ED/ES frames
- **Representation**: Small implicit neural representation (SDF/occupancy MLP) for global 3D cardiac shape  
- **Shape Prior**: Lightweight variational autoencoder trained on cardiac meshes for regularization

### Core Pipeline
- **Pose Estimation**: Update per-slice rigid pose parameters to minimize differentiable projection loss
- **Shape Refinement**: Update implicit neural representation parameters with geometric regularization
- **Mesh Extraction**: Use Marching Cubes for watertight surface extraction and clinical metric computation

## Key Innovations

- **2D-First Supervision**: Training primarily from readily available 2D contours rather than expensive 3D labels
- **Joint Pose-Shape Optimization**: Explicit handling of pose uncertainty in clinical echo acquisition
- **Minimal View Requirements**: Reconstruction from as few as 2-4 standard echo planes
- **Clinical Validation**: Systematic analysis of reconstruction quality versus clinical metrics

This work addresses the gap between widely available 2D echocardiography and the need for accurate 3D cardiac assessment. By enabling 3D reconstruction from standard 2D echo views, the method could improve diagnostic accuracy in resource-limited settings without requiring expensive 3D imaging equipment. The project combines modern 3D vision techniques (implicit representations, differentiable rendering) with practical medical imaging challenges, contributing to both computer vision research and clinical cardiology applications.

Collaborator: Vaibhav S Parekh
