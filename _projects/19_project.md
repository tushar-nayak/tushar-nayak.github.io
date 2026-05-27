---
layout: page
title: Multi-Scale Lung Histopathology Classification
description: A pathology model that fuses 20x and 40x whole-slide image views with cross-scale attention for malignancy, subtype, and differentiation grading.
img: assets/img/lc.png
importance: 3
category: personal projects
github: https://github.com/tushar-nayak/lobe-ranger
website: https://tushar-nayak.github.io/lobe-ranger/
---

## project status: prototype

{% include project_links.liquid %}

Lobe Ranger is a multi-scale ordinal pathology foundation network for whole-slide lung histopathology.

The model pairs 20x and 40x image views so the network can preserve both architectural context and cytologic detail. A shared ViT backbone feeds bidirectional cross-scale attention and multi-task heads for malignancy, subtype, and ordinal differentiation classification.

Core pieces:

- Patient-wise 20x and 40x magnification pairing
- Shared ViT feature extraction
- Bidirectional cross-scale attention fusion
- Multi-task classification for malignancy, subtype, and differentiation grade
- Attention audit utilities for explainability checks
