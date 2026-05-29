---
layout: post
title: "reproducibility lessons from building multiple medical vision pipelines"
date: 2026-05-14 10:00:00
description: Why repeated pipeline work teaches you to respect paths, splits, metadata, and boring logs.
tags: reproducibility medical-vision pipelines research-engineering medical-imaging
categories: research
---

Building one medical vision pipeline teaches you the method. Building several teaches you paranoia.

Not dramatic paranoia. Useful paranoia. The kind that makes you check paths, splits, metadata, preprocessing, seeds, and whether the output you are looking at actually came from the run you think it did.

That paranoia is earned.

## The model is rarely the only source of error

When a result looks wrong, the model is an easy suspect. Sometimes it is the model. Very often it is the pipeline.

The image spacing was ignored. The mask and volume were paired incorrectly. The train and test split leaked. A crop removed the region of interest. A transform was applied to the image but not the label. A saved checkpoint was not the one you thought. A visualization silently rescaled intensities and made the output look better or worse than it was.

These are not glamorous mistakes, but they matter.

## Metadata is part of the data

Medical images are not just arrays.

Spacing, orientation, origin, affine transforms, DICOM metadata, scanner conventions, and acquisition parameters can all change the interpretation of the image. If the pipeline strips that information too early, it may still run, but the result becomes less meaningful.

That is especially important when moving between image processing libraries, tensors, and geometry tools. SimpleITK, PyTorch or MONAI, and VTK each have different assumptions. The transitions between them need to be explicit.

## Logs are not optional

A reproducible pipeline should leave a trail.

Which dataset version? Which split? Which preprocessing configuration? Which checkpoint? Which metrics? Which output folder? Which failures? Which cases were excluded and why?

If that information is not recorded, the project becomes fragile. You may still get a result, but you cannot defend it cleanly or return to it later without guesswork.

This is why I like run folders with metrics, plots, checkpoints, configs, and exported artifacts. It feels heavy until it saves you.

## The repeat offenders

The repeated failure is assuming you will remember.

You will not remember which preprocessing flag produced the best run. You will not remember whether the validation set was case-wise or slice-wise. You will not remember whether the mesh came from raw prediction or post-processed prediction. You will not remember which notebook cell created which artifact.

A reproducible pipeline is a way of not trusting your future memory.

## The pattern across projects

Across lung CT segmentation, sparse reconstruction, denoising, pathology classification, and mesh export work, the most useful habit was to make every stage produce inspectable outputs.

Not just final metrics. Intermediate volumes, overlays, case-wise tables, meshes, plots, and configs. That makes debugging less philosophical. You can actually trace where the pipeline started lying.

## The boring rule that keeps winning

Reproducibility is research infrastructure.

It is not separate from the scientific contribution. It determines whether the contribution can be tested, extended, compared, and trusted. A clever model inside a brittle pipeline is less useful than it looks.

## What I would automate earlier

For every new medical vision project, I would make a tiny smoke-test dataset and force the full pipeline to run end to end before scaling anything.

One case. One training step. One inference output. One metric file. One visualization. One exported artifact if geometry is involved.

If the tiny version is clean, scaling becomes much less scary. If the tiny version is messy, the full version was never going to be trustworthy anyway.
