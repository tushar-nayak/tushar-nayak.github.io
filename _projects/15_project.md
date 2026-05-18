---
layout: page
title: DermaSeg
description: Deep Learning-Based Skin Lesion Segmentation on ISIC 2018
img: https://tushar-nayak.github.io/derma-seg/assets/isic_deeplabv3_sample_001.png
importance: 2
category: personal projects
---

    ---
    project status: completed baseline + active extensions
    ---

<div style="max-width: 520px; margin: 24px auto; text-align: center;">
  <a href="https://github.com/tushar-nayak/derma-seg"
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
      <span>derma-seg</span>
    </div>

    <div style="font-size: 0.95rem; opacity: 0.8;">
      View the source code
    </div>

  </a>
</div>

## Overview

**DermaSeg** is a medical image segmentation project focused on automated skin lesion boundary detection from dermoscopic images. The project is built around the **ISIC 2018 Task 1 lesion segmentation benchmark** and is designed as a reproducible comparison framework across classical CNN segmentation models, attention-based architectures, lightweight transformer models, and promptable foundation-model baselines.

Rather than training a single model in isolation, DermaSeg is structured as a complete segmentation workflow: dataset loading, preprocessing, supervised training, validation-based checkpoint selection, test-set evaluation, qualitative visualization, and metric summarization.

## Current Status: Strong ISIC Baseline

The current completed experiment uses a **DeepLabV3 model with a pretrained ResNet-50 backbone** for binary lesion-vs-background segmentation.

| Model | Best Val Dice | Best Val IoU | Best Val TJ | Test Dice | Test IoU | Test TJ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| DeepLabV3 | 0.8900 | 0.8134 | 0.7598 | 0.8782 | 0.7991 | 0.7320 |

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