---
layout: page
title: Open-Vocabulary Surgical Tool Detection and Tracking
description: A real endoscopy pipeline that turns text prompts into surgical tool boxes, masks, tracking overlays, and evaluation metrics using Grounding DINO and SAM2.
img: assets/img/pointcloud3.gif
importance: 1
category: personal projects
github: https://github.com/tushar-nayak/surgi-prompt
website: https://tushar-nayak.github.io/surgi-prompt/
status: active prototype
tags: [Surgical Robotics, Tool Tracking, Open-Vocabulary AI, Segmentation]
featured: true
---

## project status: active prototype

SurgiPrompt maps text prompts such as `forceps`, `grasper`, `catheter`, and `guidewire` directly onto real endoscopic and laparoscopic video frames.

The pipeline combines Grounding DINO for open-vocabulary box localization with SAM2 mask refinement and video propagation. It supports real-data inference, dataset evaluation, and fine-tuning against endoscopy datasets exported in COCO-style formats.

Core pieces:

- Prompt-driven surgical tool localization without fixed closed-set labels
- SAM2 mask refinement and video tracking overlays
- Real dataset support for Endoscapes2023, Kvasir-Instrument, and generic COCO exports
- Tracked metrics for mAP, mask IoU, FPS, and failure-case inspection
