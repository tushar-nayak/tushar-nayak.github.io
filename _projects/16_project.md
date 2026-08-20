---
layout: page
title: Open-Vocabulary Surgical Tool Detection and Tracking
description: Detects and tracks surgical instruments from open-vocabulary prompts for adaptable intra-operative perception.
img: assets/img/project_thumbnails/surgi-prompt.jpg
importance: 1
category: personal projects
github: https://github.com/tushar-nayak/surgi-prompt
website: https://tushar-nayak.github.io/surgi-prompt/
status: active prototype
tags: [Surgical Robotics, Tool Tracking, Open-Vocabulary AI, Segmentation]
featured: true
homepage_featured: true
homepage_order: 2
---

## project status: active prototype

SurgiPrompt maps text prompts such as `forceps`, `grasper`, `catheter`, and `guidewire` directly onto real endoscopic and laparoscopic video frames.

The pipeline combines Grounding DINO for open-vocabulary box localization with SAM2 mask refinement and video propagation. It supports real-data inference, dataset evaluation, and fine-tuning against endoscopy datasets exported in COCO-style formats.

Core pieces:

- Prompt-driven surgical tool localization without fixed closed-set labels
- SAM2 mask refinement and video tracking overlays
- Real dataset support for Endoscapes2023, Kvasir-Instrument, and generic COCO exports
- Tracked metrics for mAP, mask IoU, FPS, and failure-case inspection
