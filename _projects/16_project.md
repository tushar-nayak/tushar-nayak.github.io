---
layout: page
title: Open-Vocabulary Surgical Tool Detection and Tracking
description: Detects and tracks surgical instruments from free-text prompts, removing the fixed-label assumption that limits closed-set surgical perception.
img: assets/img/project_thumbnails/surgi-prompt.jpg
importance: 1
category: personal projects
github: https://github.com/tushar-nayak/surgi-prompt
website: https://tushar-nayak.github.io/surgi-prompt/
status: active
tags: [Surgical Robotics, Tool Tracking, Open-Vocabulary AI, Segmentation]
featured: true
---

## summary

**SurgiPrompt** localizes and tracks surgical instruments in endoscopic and laparoscopic video from free-text prompts such as `forceps`, `grasper`, `catheter`, or `guidewire` — with no fixed label set and no task-specific detector training.

## problem

Surgical tool detectors are almost always trained as closed-set classifiers over whatever instrument taxonomy a given dataset happens to annotate. That assumption breaks in practice: instrument inventories differ between hospitals and procedures, new tools appear, and a model trained on one taxonomy cannot name anything outside it. Re-annotating and retraining for every new instrument does not scale.

Open-vocabulary models offer a way out, but they are trained on natural images. Surgical video violates most of their assumptions — specular highlights, smoke, blood, motion blur, occlusion by tissue, and instruments that look far more alike than everyday objects do.

## approach

The pipeline composes existing foundation models rather than training a new detector, then evaluates where that composition actually holds up on surgical data.

- **Grounding DINO** for open-vocabulary box localization directly from the text prompt
- **SAM2** for mask refinement, converting coarse boxes into instrument-accurate segmentation
- **Video propagation** through SAM2 so identity persists across frames instead of being re-detected independently each time
- **Optional fine-tuning** against endoscopy datasets exported in COCO-style formats, for cases where the zero-shot prompt is not enough

The more interesting half of the work is measurement: the repository tracks mAP, mask IoU, and FPS, and supports failure-case inspection, because the practical question is not whether open-vocabulary detection works on surgical video but _where it stops working_.

## evaluation

Real-data support covers **Endoscapes2023**, **Kvasir-Instrument**, and generic COCO exports, so prompts can be tested against annotated ground truth rather than judged by eye.

Recurring failure modes worth naming:

- Visually similar instruments are reliably found but unreliably _distinguished_ by prompt alone
- Specular highlights and smoke degrade box quality more than mask quality
- Propagation drifts after full occlusion, where re-detection would be more robust than tracking

## limitations

- A prototype assembled from foundation models, not a trained surgical detector, and inherits their biases
- Latency is well short of the real-time budget a true intra-operative system would require
- Prompt sensitivity is substantial: phrasing changes results more than it should

## next steps

- [x] Prompt-driven localization with SAM2 mask refinement
- [x] Video propagation and tracking overlays
- [x] Multi-dataset evaluation harness with failure-case inspection
- [ ] Quantify prompt sensitivity systematically rather than anecdotally
- [ ] Re-detection fallback for post-occlusion recovery
- [ ] Latency reduction toward interactive use
