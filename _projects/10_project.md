---
layout: page
title: Neural Anisotropic Diffusion for Medical Image Relaxation
description: Course project for Medical Image Analysis
img: assets/img/project_thumbnails/neural-anisotropic-diffusion.png
importance: 3
category: course projects
github: https://github.com/tushar-nayak/neural-anisotropic-diffusion
website: https://tushar-nayak.github.io/neural-anisotropic-diffusion/
status: completed
tags: [Medical Imaging, PDEs, Denoising, Course Project]
---

Project Status: Completed

## Project Overview

Medical image denoising faces a strict tradeoff: removing heavy noise without erasing the underlying anatomical structure. Standard filters often blur critical features like tumor margins and tissue boundaries.

This project explores an edge-aware restoration technique by **unrolling the classical Perona-Malik Partial Differential Equation (PDE) into a neural network**. Instead of relying on fixed, rigid mathematical rules for diffusion, this model uses a lightweight Convolutional Neural Network (CNN) to learn spatially varying conduction coefficients directly from the local image context.

## The Core Idea

Traditional Anisotropic Diffusion works like a "smart blur"—it diffuses pixels in flat regions but stops blurring when it detects an edge. However, mathematical edge-detectors are easily fooled by heavy medical noise (like Speckle or Rician noise), leaving artifacts behind.

**The Neural Approach:**

1. **Unroll the Loop:** We unroll the iterative PDE update process into an end-to-end differentiable network.
2. **Context-Aware Guidance:** We use a `MiniUNet` to extract global structural context (identifying where the skull, tumors, and white matter are).
3. **Learned "Smart Gates":** A Conduction Network analyzes directional gradients (4 or 8-neighborhood) combined with the global context to predict weights between 0 and 1. These weights act as gates, dynamically telling the diffusion equation exactly where to blur and where to protect a boundary.

## Architecture Highlights

- **Input:** Noisy Brain MRI slices.
- **Guidance Encoder:** `MiniUNet` extracts robust structural features.
- **Directional Gradients:** Calculates pixel intensity differences across 4 or 8 local neighborhoods.
- **Conduction Network:** Learns the spatial diffusion weights.
- **Residual Refinement:** An optional final stage to polish micro-textures and correct color shifts after the PDE loop.
- **Loss Function:** Designed to aggressively protect edges while smoothing noise:
  `Loss = SSIM + L1 + (0.1 * Gradient Loss)`

## Dataset & Training Setup

- **Dataset:** Br35H Brain Tumor Dataset (3,000 MRI slices).
- **Split:** 2,100 Train | 450 Validation | 450 Test.
- **Corruptions:** Synthetically corrupted using Gaussian, Rician, and Speckle noise.
- **Optimization:** Cosine annealing learning rate scheduling and gradient clipping for PDE stability.

## Results

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_qualitative_results.png" title="cap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Qualitative denoising results showing sharp edge preservation compared to noisy inputs.
</div>

The Unified Neural PDE significantly outperformed classical, non-learned baselines. Because traditional algorithms lack semantic context, they hit a performance ceiling around ~20 dB PSNR. By learning the specific visual signatures of brain tissue, our approach shattered that ceiling, reaching nearly **25 dB**.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_comparison_plot.png" title="cap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Quantitative metric comparison across different denoising methods.
</div>

| Method                        | PSNR (dB)  | SSIM      | Edge MSE  |
| :---------------------------- | :--------- | :-------- | :-------- |
| Gaussian Smoothing            | 19.011     | 0.552     | 0.185     |
| Skimage TV                    | 19.482     | 0.570     | 0.134     |
| Classical PM (16 iter)        | 19.635     | 0.539     | 0.106     |
| **Unified Neural PDE (Ours)** | **24.853** | **0.719** | **0.056** |

_Note: The model successfully reduced noise and preserved large-scale contrast and tumor boundaries, outperforming the best classical baseline (Non-Local Means) by +4.46 dB PSNR._

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_loss_curves.png" title="cap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Training and validation loss/PSNR curves over 300 epochs.
</div>
