---
layout: page
title: Neural Active Contours
description: A non U-Net segmentation approach for medical images
img: assets/img/pointcloud1.gif
importance: 1
category: personal projects
github: https://github.com/tushar-nayak/neural-active-contours/
status: active
tags: [Medical Imaging, Segmentation, Active Contours, Deep Learning]
---

An exploration of medical image segmentation that predicts an evolving boundary rather than a dense per-pixel mask.

Encoder-decoder segmentation networks label every voxel independently, so anatomical boundaries can come out fragmented or topologically implausible. Classical active contour methods take the opposite view: represent the structure as a curve and evolve it under image and smoothness forces. This project asks what a learned version of that formulation looks like, and where it helps on medical data.

Current direction:

- Represent the target structure as a deformable contour instead of a dense mask
- Learn the evolution forces that drive the contour toward anatomical boundaries
- Keep boundary smoothness and topology as properties of the representation rather than post-processing steps
- Compare against standard U-Net baselines on the same data

This is an early-stage exploration; the repository tracks ongoing experiments rather than a finished benchmark.
