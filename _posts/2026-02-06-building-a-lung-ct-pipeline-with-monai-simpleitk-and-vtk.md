---
layout: post
title: "building a lung ct pipeline with monai, simpleitk, and vtk"
date: 2026-02-06 10:00:00
description: Why putting segmentation, spatial preprocessing, and surface export in one pipeline is much more useful than training a model in isolation.
tags: medical-imaging ct segmentation monai simpleitk vtk
categories: research
---

Training a segmentation model is one thing. Building a pipeline you can actually run end to end on real CT volumes is another thing entirely.

That is basically what I liked about the lung CT pipeline work. It was not just “train a network, report a Dice, done.” It forced the whole stack to behave.

## Why the tool split makes sense

SimpleITK, MONAI, and VTK each end up doing the part they are good at.

SimpleITK is where the medical image sanity lives: loading NIfTI volumes properly, preserving spacing and orientation, cropping around anatomy, resampling to a target shape, and making sure you do not quietly lose the spatial metadata that makes the scan medically meaningful.

MONAI handles the actual segmentation side well. A 3D UNet, sensible medical-imaging utilities, sliding-window inference, Dice-style losses, the usual infrastructure you want without rebuilding it from scratch.

VTK comes in once the prediction needs to become geometry. That is the surface export part, where the mask stops being just a label volume and starts becoming something you can inspect as anatomy.

That division of labor matters because these libraries think in different native objects. SimpleITK cares about image metadata and physical space. MONAI mostly cares about tensors, patches, and training loops. VTK cares about polygonal geometry and surface processing. A real pipeline has to translate cleanly between those worlds without losing what each one knows.

## The preprocessing is where the pipeline becomes real

The part people often skip over is that full-volume CT is messy in very ordinary ways. Sizes differ. spacings differ. The lungs occupy different fractions of the field of view. If you just throw raw volumes at a model, the pipeline gets fragile fast.

So the boring steps matter. Crop around the lung region. Clip intensities to a reasonable HU window. Normalize. Resize to a consistent 3D shape that you can actually train on. None of that is glamorous, but that is what turns a pile of scans into a trainable dataset.

The cropping step is especially useful because it changes the class balance and the field of view in a good way. If you train on the whole thorax without thinking, the network spends a lot of capacity modeling empty space and background anatomy that is not the target. Crop around the lung mask and suddenly the model sees more of what you actually want it to learn.

Resampling is the other subtle one. CT scans come with different voxel spacings, and if you ignore that, the same physical structure appears at inconsistent scales across the dataset. Once you resample to a common target spacing or shape, the model gets a more stable input distribution. The tradeoff is interpolation error, so you are always balancing geometric fidelity against practical trainability.

## Why I like the compact 3D setup

The lung pipeline uses a compact 3D target volume instead of pretending unlimited compute exists. I like that tradeoff because it is honest.

You still keep the problem volumetric, which matters for anatomy, but you make it tractable enough to run reproducibly. In the actual project, the full run over the 20-case public dataset produced a mean lung Dice of `0.9243`, mean HD95 of `10.5909`, and best validation Dice of `0.9539`. Those numbers are useful, but the more useful thing is that the whole pipeline completed and exported the outputs you would actually want downstream.

The MONAI setup itself is pretty standard in a good way: a 3D UNet, Dice-plus-cross-entropy style supervision, and sliding-window inference for full volumes. That is not exotic, but it is a sensible baseline because it keeps the project focused on pipeline integrity rather than pretending the architecture is the whole innovation.

The interesting part in the results was not just the mean performance. It was the split in case difficulty. Some cases came out very cleanly, others less so, which is exactly the kind of thing a pipeline should expose. You want that kind of unevenness to show up, because it gives you somewhere concrete to inspect instead of hiding behind an average.

## Why mesh export belongs inside the same pipeline

I do not think mesh extraction should be treated as an optional demo after the segmentation is finished.

If the target workflow involves planning, visualization, or navigation-prep, then surface generation is part of the job. The VTK export step is where you find out whether your masks survive conversion into something usable. If the mesh looks broken, the pipeline is not really done just because the overlap metric looked decent.

Using discrete marching cubes, smoothing, and export to formats like `.stl` and `.vtp` makes the predictions portable. That sounds mundane, but it matters. Once the geometry leaves the training code and becomes an actual artifact another tool can read, the project stops being just a segmentation experiment and starts looking like infrastructure.

## What this kind of project teaches you

Projects like this are a good reminder that usable medical AI is usually a pipeline problem, not just a model problem.

The model matters, obviously. But so do checksum verification, data pairing, spatial preprocessing, export format choices, metric reporting, and the ability to rerun everything without handholding. That is the difference between a one-off notebook result and a system you can actually build on.
