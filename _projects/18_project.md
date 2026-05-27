---
layout: page
title: Sparse-View Coronary Vessel Reconstruction
description: A research prototype for recovering 3D coronary vessel geometry from limited angiographic projections using differentiable rendering and hemodynamic constraints.
img: assets/img/newplot.png
importance: 2
category: personal projects
github: https://github.com/tushar-nayak/vascular-reconstruction
status: research prototype
tags: [3D Vision, Medical Imaging, Vascular Reconstruction, Differentiable Rendering]
---

## project status: research prototype

This project explores sparse-view 3D coronary vessel reconstruction from angiographic projections.

The implementation combines Gaussian geometry, differentiable rendering, and physics-informed hemodynamic regularization to recover vessel structure when only limited projection views are available.

Core pieces:

- Sparse-view angiographic reconstruction
- Gaussian vessel geometry representation
- Differentiable rendering supervision
- PINN-style hemodynamic constraints for physiologically plausible geometry
