---
layout: page
title: Attention-augmented Dual-View Mammogram Alignment for Enhanced BI-RADS Classification
description: Course project for Projects in Biomedical AI
importance: 2
category: course projects
github: https://github.com/tushar-nayak/grading-cbisddsm
report: https://github.com/tushar-nayak/grading-cbisddsm/blob/main/42657A_G3Report.pdf
status: completed
tags: [Medical Imaging, Mammography, Classification, Course Project]
---

    ---
    project status: Complete!
    ---

### [Project Report](https://github.com/tushar-nayak/grading-cbisddsm/blob/main/42657A_G3Report.pdf)

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
  Output: Fused tensor [CC, aligned MLO], saved for downstream trainingCollaborator: [Elissa Matlock](https://www.linkedin.com/in/elissa-matlock/)
