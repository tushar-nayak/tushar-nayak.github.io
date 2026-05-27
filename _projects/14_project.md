---
layout: page
title: Neural Morphological Analysis of Fungi
description: A microscopy project for fungal species classification and future neural-field modeling of morphology from high-resolution biological image patches.
img: assets/img/bi-dl.jpg
importance: 3
category: personal projects
github: https://github.com/tushar-nayak/fungal-neo/
---

    ---
    project status: alpha stage
    ---

{% include project_links.liquid %}

## Current Status: Phase 1 (Classification)

We are currently in the initial phase of the project, establishing a robust classification baseline for 9 different fungal species.

- **Dataset Integrated:** High-resolution microscopic images (3600x5760) from the [Fungus Dataset](https://github.com/bziiuj/fungus).
- **Patch-Based Learning:** Implementation of a ResNet18-based classifier that learns from 224x224 patches, guided by biological masks to focus specifically on fungal structures.
- **Explainability:** Integrated Grad-CAM (Gradient-weighted Class Activation Mapping) to visualize and interpret the features the model uses for identification.

## Next Steps: Neural Morphological Signatures

Once the classification baseline is stabilized, we will move towards:

1. **Neural Fields (SIREN):** Learning implicit representations of fungal morphology for infinite-resolution analysis.
2. **Latent Morphing:** Exploring the morphological transitions between species in a shared latent space.
3. **VLM Grounding:** Using Vision-Language Models (like CLIP) for open-vocabulary querying of fungal features.
