---
layout: page
title: Neural Anisotropic Diffusion for Medical Image Relaxation
description: Course project for Medical Image Analysis
img: assets/img/6.jpg
importance: 3
category: course projects
---

**Project Status:** Completed  
**Course:** 16725 (Bio)Medical Image Analysis, Carnegie Mellon University  

---

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

* **Input:** Noisy Brain MRI slices.
* **Guidance Encoder:** `MiniUNet` extracts robust structural features.
* **Directional Gradients:** Calculates pixel intensity differences across 4 or 8 local neighborhoods.
* **Conduction Network:** Learns the spatial diffusion weights.
* **Residual Refinement:** An optional final stage to polish micro-textures and correct color shifts after the PDE loop.
* **Loss Function:** Designed to aggressively protect edges while smoothing noise: 
  `Loss = SSIM + L1 + (0.1 * Gradient Loss)`

## Dataset & Training Setup

* **Dataset:** Br35H Brain Tumor Dataset (1500 MRI slices).
* **Split:** 117 Train | 38 Validation | 38 Test.
* **Corruptions:** Synthetically corrupted using Gaussian, Rician, and Speckle noise.
* **Optimization:** Cosine annealing learning rate scheduling and gradient clipping for PDE stability.

## Results

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_qualitative_results.png" title="cap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    .
</div>

The Unified Neural PDE significantly outperformed classical, non-learned baselines. Because traditional algorithms lack semantic context, they hit a performance ceiling around ~20 dB PSNR. By learning the specific visual signatures of brain tissue, our approach shattered that ceiling.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_comparison_plot.png" title="cap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    .
</div>

| Method | PSNR (dB) | SSIM |
| :--- | :--- | :--- |
| Gaussian Smoothing | 19.996 | 0.549 |
| Skimage TV | 20.068 | 0.558 |
| Classical PM (16 iter) | 20.005 | 0.498 |
| **Unified Neural PDE (Ours)** | **23.612** | **0.657** |

*Note: The model successfully reduced noise and preserved large-scale contrast and tumor boundaries, though some over-smoothing of the finest micro-textures remains a limitation.*

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_loss_curves.png" title="cap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    .
</div>

## Code & Implementation

The entire pipeline—including the unrolled PDE module, the custom loss functions, and the training scripts—is written in PyTorch. 

The unified codebase is publicly available on GitHub:
<div style="text-align: center; margin-top: 30px;">
  <a href="https://github.com/tushar-nayak/neural-anisotropic-diffusion/tree/unified-final" target="_blank" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 30px; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s;">
    🚀 View the Codebase
  </a>
</div>