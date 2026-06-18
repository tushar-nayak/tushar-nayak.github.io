---
layout: page
title: Skin Lesion Segmentation on ISIC 2018
description: A reproducible dermoscopy segmentation benchmark with DeepLabV3 baselines, planned U-Net and transformer comparisons, and promptable SAM-style extensions.
img: assets/img/project_thumbnails/derma-seg.png
importance: 2
category: personal projects
github: https://github.com/tushar-nayak/derma-seg
website: https://tushar-nayak.github.io/derma-seg/
status: active extension
tags: [Medical Imaging, Dermatology, Segmentation, Benchmarking]
---

## summary

DermaSeg is a reproducible skin-lesion segmentation benchmark built around ISIC 2018. Rather than training a single model in isolation, the project is structured as a full workflow for comparing classical CNNs, transformer-style models, and promptable segmentation systems under a shared evaluation setup.

## problem

Skin lesion segmentation is often presented through isolated model results that are hard to compare fairly. The practical need here is a benchmark that keeps preprocessing, training, validation, metrics, and qualitative inspection consistent across model families.

## approach

The current completed experiment uses a **DeepLabV3 model with a pretrained ResNet-50 backbone** for binary lesion-vs-background segmentation.

| Model     | Best Val Dice | Best Val IoU | Best Val TJ | Test Dice | Test IoU | Test TJ |
| --------- | ------------: | -----------: | ----------: | --------: | -------: | ------: |
| DeepLabV3 |        0.8900 |       0.8134 |      0.7598 |    0.8782 |   0.7991 |  0.7320 |

These results come from a local run on the official ISIC 2018 split, not from copied leaderboard values. The best checkpoint is selected using validation threshold Jaccard and then evaluated on the held-out test set.

The project uses a supervised two-class segmentation setup:

- **Dataset:** ISIC 2018 Task 1 lesion boundary segmentation
- **Input:** RGB dermoscopic images resized to `320 × 320`
- **Model:** DeepLabV3 with a pretrained ResNet-50 backbone
- **Loss:** combined cross-entropy and Dice loss
- **Selection metric:** validation threshold Jaccard
- **Outputs:** checkpoints, metrics JSON, Markdown experiment summaries, and qualitative prediction panels

DeepLabV3 was chosen as the first strong baseline because it provides a serious non-U-Net comparison point while still handling multi-scale lesion context well.

## result

DermaSeg is designed to compare multiple segmentation model families under a shared training and evaluation pipeline.

### supervised segmentation models

- U-Net
- Attention U-Net
- SegNet
- U-Net++
- DeepLabV3
- SwinUNetLite
- SegFormerLite

### promptable foundation-model extensions

- SAM
- MedSAM
- box-prompted evaluation workflow
- a separate promptable evaluation path to avoid unfairly mixing supervised and foundation-model comparisons

## qualitative evaluation

The repository exports qualitative prediction panels from the saved DeepLabV3 checkpoint. Each panel compares:

1. the original dermoscopic input image
2. the ground-truth lesion mask overlay
3. the predicted lesion mask overlay

That makes the project interpretable as a benchmark rather than just a metrics table.

## limitations

- only the DeepLabV3 baseline is fully completed so far
- lesion datasets remain smaller and noisier than ideal for large model comparisons
- promptable foundation-model evaluation is still an extension path rather than a finished benchmark

## next steps

The next phase of DermaSeg will focus on:

1. comparing cross-entropy + Dice, Tversky, and focal Tversky losses
2. running full evaluations across U-Net, Attention U-Net, U-Net++, DeepLabV3, SwinUNetLite, and SegFormerLite
3. evaluating SAM and MedSAM with box prompts derived from lesion masks
4. categorizing failure modes by lesion size, contrast, and artifact profile
5. adding direct qualitative result panels to the project page
