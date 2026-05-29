---
layout: post
title: "when to use cnns, transformers, or foundation models in medical imaging"
date: 2026-05-12 10:00:00
description: Why model choice in medical imaging should start with the data, not the trend.
tags: medical-imaging cnns transformers foundation-models deep-learning
categories: research
---

People ask this like there is a clean ranking: first CNNs, then transformers, then foundation models, with each one replacing the last. That is not how it feels when you are actually building the project.

The more useful way to think about it is almost annoyingly plain. Start with the data you really have, the failure mode you care about, and the output artifact you need. Only then does the architecture choice stop looking like fashion.

The least useful way to choose a model is to start with the newest architecture and work backward.

## CNNs are still very hard to dismiss

CNNs are strong when locality matters, data is limited, and the imaging task has clear spatial structure.

That describes a lot of medical imaging. Lesion segmentation, organ segmentation, denoising, slice classification, and many 3D volumetric tasks still fit CNNs very naturally. Convolutions give you translation-aware local feature extraction and good parameter efficiency. That matters when you do not have internet-scale data.

A well-tuned 3D U-Net can be more valuable than a trendy model that is harder to train, harder to debug, and only slightly better under one split.

## Transformers help when context matters

Transformers become attractive when long-range context is important.

Pathology is a good example because local patches do not always tell the whole story. Multi-scale tissue architecture, slide-level relationships, and region interactions can matter. A transformer-style model can help reason across tokens, regions, or scales.

They can also help in multi-modal settings where the model needs to fuse image features, geometry, camera parameters, or text-like metadata.

The tradeoff is that transformers are usually more data-hungry and more sensitive to training design. If the dataset is small and the task is mostly local, using a transformer can be more about fashion than function.

## Foundation models are useful starts, not final answers

Foundation models are most useful when annotation is expensive, the visual domain is broad, or you need a strong pretrained representation.

They can help with feature extraction, weak supervision, open-vocabulary tasks, and reducing the amount of labeled data needed for a first system. In surgical vision, for example, they can help bootstrap tool or anatomy understanding. In pathology, they can provide useful tile embeddings.

But they do not automatically solve medical imaging. They may not understand modality physics. They may not preserve metric geometry. They may be poorly calibrated. They may fail under domain shift. They may give you impressive features but not the clinical behavior you need.

## The architecture-first mistake

The failure mode I keep seeing is architecture-first thinking.

A project starts with “let us use a transformer” instead of “what failure mode are we trying to fix?” Then the method becomes hard to interpret. If it works, nobody knows why. If it fails, nobody knows where.

The opposite failure also happens: refusing newer models because the baseline is familiar. If the task really needs global context or cross-scale reasoning, a pure CNN may be the limiting factor.

## How this looked across real projects

Across my own projects, the model choice usually made more sense after the task was clear.

For lung CT segmentation, a compact 3D U-Net was a sensible baseline because the main challenge was building a reliable volumetric pipeline. For histopathology, multi-scale context pushed the problem toward attention-based fusion. For sparse reconstruction, the representation and geometry mattered as much as the backbone. For physics-informed denoising, the architecture came from the PDE structure rather than from a generic leaderboard instinct.

That is the pattern I trust: choose the model because it matches the constraint.

## A simpler decision rule

CNNs, transformers, and foundation models are tools with different failure modes.

CNNs can be too local. Transformers can be too data-hungry or unnecessarily heavy. Foundation models can be powerful but misaligned with the medical details that matter. None of them gets a free pass.

## The order I would make the choice in

For any new medical imaging project, I would start with a strong simple baseline, then define the exact weakness.

If the weakness is local boundary quality, maybe improve the loss or preprocessing before changing the model. If the weakness is global context, try attention or multi-scale fusion. If the weakness is annotation scarcity, consider a foundation model or self-supervised pretraining. If the weakness is physical plausibility, the answer may not be a new backbone at all.

That is a much better workflow than chasing model families.
