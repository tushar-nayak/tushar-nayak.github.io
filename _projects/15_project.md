---
layout: page
title: Skin Lesion Segmentation on ISIC 2018
description: A reproducible dermoscopy segmentation benchmark with DeepLabV3 baselines, planned U-Net and transformer comparisons, and promptable SAM-style extensions.
img: https://tushar-nayak.github.io/derma-seg/assets/isic_deeplabv3_sample_001.png
importance: 2
category: personal projects
github: https://github.com/tushar-nayak/derma-seg
website: https://tushar-nayak.github.io/derma-seg/
status: active extension
tags: [Medical Imaging, Dermatology, Segmentation, Benchmarking]
featured: true
---

    ---
    project status: completed baseline + active extensions
    ---

## Overview

**DermaSeg** is a medical image segmentation project focused on automated skin lesion boundary detection from dermoscopic images. The project is built around the **ISIC 2018 Task 1 lesion segmentation benchmark** and is designed as a reproducible comparison framework across classical CNN segmentation models, attention-based architectures, lightweight transformer models, and promptable foundation-model baselines.

Rather than training a single model in isolation, DermaSeg is structured as a complete segmentation workflow: dataset loading, preprocessing, supervised training, validation-based checkpoint selection, test-set evaluation, qualitative visualization, and metric summarization.

## Current Status: Strong ISIC Baseline

The current completed experiment uses a **DeepLabV3 model with a pretrained ResNet-50 backbone** for binary lesion-vs-background segmentation.

| Model     | Best Val Dice | Best Val IoU | Best Val TJ | Test Dice | Test IoU | Test TJ |
| --------- | ------------: | -----------: | ----------: | --------: | -------: | ------: |
| DeepLabV3 |        0.8900 |       0.8134 |      0.7598 |    0.8782 |   0.7991 |  0.7320 |

These results come from a local run on the official ISIC 2018 split, not from copied leaderboard values. The best checkpoint is selected using validation threshold Jaccard and then evaluated on the held-out test set.

## Technical Approach

The project uses a supervised 2-class segmentation setup:

- **Dataset:** ISIC 2018 Task 1 lesion boundary segmentation.
- **Input:** RGB dermoscopic images resized to `320 × 320`.
- **Model:** DeepLabV3 with a pretrained ResNet-50 backbone.
- **Loss:** Combined cross-entropy and Dice loss.
- **Selection Metric:** Validation threshold Jaccard.
- **Outputs:** Saved checkpoints, metrics JSON files, Markdown experiment summaries, and qualitative prediction panels.

DeepLabV3 was chosen as the first strong baseline because it provides a serious non-U-Net comparison point. Its atrous convolutions and ASPP module allow the model to capture multi-scale lesion context, which is useful for irregular lesion boundaries and variable lesion sizes.

## Model Coverage

DermaSeg is designed to compare multiple segmentation model families under a shared training and evaluation pipeline.

### Supervised Segmentation Models

- U-Net
- Attention U-Net
- SegNet
- U-Net++
- DeepLabV3
- SwinUNetLite
- SegFormerLite

### Promptable Foundation-Model Extensions

- SAM
- MedSAM
- Box-prompted evaluation workflow
- Separate promptable evaluation path to avoid mixing supervised and foundation-model comparisons unfairly

## Qualitative Evaluation

The repository also exports qualitative prediction panels from the saved DeepLabV3 checkpoint. Each panel compares:

1. the original dermoscopic input image,
2. the ground-truth lesion mask overlay, and
3. the predicted lesion mask overlay.

This makes the project more interpretable than a metrics-only benchmark and allows direct inspection of boundary quality, under-segmentation, over-segmentation, and lesion-shape errors.

## Why This Project Matters

DermaSeg demonstrates practical medical image segmentation beyond a one-off notebook. It shows that the same dataset and evaluation protocol can be used to compare classical encoder-decoder CNNs, atrous-convolution models, transformer-style architectures, and promptable segmentation models.

For my broader work in medical imaging and computer vision, this project strengthens my experience with:

- reproducible segmentation pipelines,
- medical benchmark datasets,
- lesion boundary detection,
- Dice/IoU/Jaccard-based evaluation,
- qualitative model inspection,
- CNN and transformer segmentation architectures,
- and foundation-model extensions for medical image analysis.

## Next Steps

The next phase of DermaSeg will focus on making the benchmark more complete and clinically meaningful:

1. **Loss Ablations:** Compare cross-entropy + Dice, Tversky, and focal Tversky losses for imbalanced lesion segmentation.
2. **Architecture Benchmarking:** Run full evaluations across U-Net, Attention U-Net, U-Net++, DeepLabV3, SwinUNetLite, and SegFormerLite.
3. **Promptable Segmentation:** Evaluate SAM and MedSAM using box prompts derived from lesion masks.
4. **Failure-Mode Analysis:** Categorize segmentation errors by lesion size, contrast, boundary ambiguity, and image artifacts.
5. **Portfolio Visualization:** Add qualitative result panels directly to the project page for visual comparison across models.
