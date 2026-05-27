---
layout: page
title: Neural Anisotropic Diffusion for Medical Image Relaxation
description: Course project for Medical Image Analysis
img: assets/img/nad_qualitative_results.png
importance: 3
category: course projects
---

Project Status: Completed

<div style="max-width: 520px; margin: 24px auto; display: flex; flex-direction: column; gap: 16px;">
  <!-- Project Website Button -->
  <a href="https://tushar-nayak.github.io/neural-anisotropic-diffusion/"
     target="_blank"
     style="
       display: block;
       padding: 16px 20px;
       border: 1px solid rgba(128,128,128,0.25);
       border-radius: 10px;
       color: inherit;
       text-decoration: none;
       text-align: center;
       transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
     "
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 18px rgba(0,0,0,0.08)'; this.style.borderColor='rgba(128,128,128,0.45)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(128,128,128,0.25)'">
    
    <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; margin-bottom: 6px;">
      <svg height="17" width="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      <span>Interactive Project Website</span>
    </div>

    <div style="font-size: 0.95rem; opacity: 0.8;">
      Explore charts, tables, and qualitative grids
    </div>

  </a>

  <!-- Source Code Button -->

<a href="https://github.com/tushar-nayak/neural-anisotropic-diffusion"
     target="_blank"
     style="
       display: block;
       padding: 16px 20px;
       border: 1px solid rgba(128,128,128,0.25);
       border-radius: 10px;
       color: inherit;
       text-decoration: none;
       text-align: center;
       transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
     "
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 18px rgba(0,0,0,0.08)'; this.style.borderColor='rgba(128,128,128,0.45)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(128,128,128,0.25)'">

    <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; margin-bottom: 6px;">
      <svg height="17" width="17" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.01-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>Source Code</span>
    </div>

    <div style="font-size: 0.95rem; opacity: 0.8;">
      View on GitHub
    </div>

  </a>
</div>

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
