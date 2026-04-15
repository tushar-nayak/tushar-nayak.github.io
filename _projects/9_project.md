---
layout: page
title: Attention-augmented Dual-View Mammogram Alignment for Enhanced BI-RADS Classification
description: Course project for Projects in Biomedical AI
img: assets/img/6.jpg
importance: 2
category: course projects
---

    ---
    project status: Complete!
    ---

This project presents a deep learning pipeline for automatic alignment and classification of dual-view mammograms using Spatial Transformer Networks (STNs) and transfer learning.
Mammography typically includes two standard views: Craniocaudal (CC) and Mediolateral Oblique (MLO). These views differ significantly in geometry, making direct comparison difficult. This project addresses that challenge by learning spatial transformations that align the two views before classification.

Objectives

- Align MLO mammograms to CC views using learned transformations
- Generate fused representations of dual-view breast images
- Predict BI-RADS categories (0–5) using a deep neural network
- Handle class imbalance and preserve ordinal relationships in labels

Spatial Alignment using a Spatial Transformer

- Input: concatenated CC + MLO images
- CNN localization network
- Fully connected regression head
- Outputs: affine transformation matrix (2×3)
  Transformation uses grid sampling to warp MLO images
  Produces: Aligned MLO and a Transformation matrix
  Output: Fused tensor [CC, aligned MLO], saved for downstream training

<div style="max-width: 520px; margin: 24px auto; text-align: center;">
  <a href="https://github.com/tushar-nayak/grading-cbisddsm"
     target="_blank"
     style="
       display: block;
       padding: 16px 20px;
       border: 1px solid rgba(128,128,128,0.25);
       border-radius: 10px;
       color: inherit;
       text-decoration: none;
       transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
     "
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 18px rgba(0,0,0,0.08)'; this.style.borderColor='rgba(128,128,128,0.45)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(128,128,128,0.25)'">
    
    <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; margin-bottom: 6px;">
      <svg height="17" width="17" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.01-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>grading-cbisddsm</span>
    </div>

    <div style="font-size: 0.95rem; opacity: 0.8;">
      View the source code
    </div>
  </a>
</div>

Collaborator: [Elissa Matlock](https://www.linkedin.com/in/elissa-matlock/)
