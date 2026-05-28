---
layout: post
title: "from medical image segmentation to usable geometry: why meshes matter"
date: 2025-11-26 10:00:00
description: Why a segmentation mask is often only the middle of the pipeline, not the end of it.
tags: medical-imaging segmentation geometry meshes vtk surface-export
categories: research
---

Segmentation gets a lot of attention because it is easy to explain and easy to score. Feed in an image, predict a mask, compute Dice, move on.

But in a lot of medical workflows, the mask is not really the final product. It is the thing you need before the thing you actually care about.

## The mask is usually a waypoint

If the downstream task is navigation, planning, simulation, or even just decent 3D visualization, a voxel mask is not always enough. You usually want geometry you can inspect, rotate, smooth, render, or measure as a surface.

That is where meshes come in. Once you extract a surface from the segmentation, the output starts behaving more like an object and less like a label volume.

## Why voxel overlap is only part of the story

A segmentation can score well and still give you ugly geometry. Jagged boundaries, stair-step artifacts, disconnected islands, weird local bumps, or topological glitches do not always hurt overlap metrics that much, especially on large structures.

But once you convert that label map into a mesh, those problems become hard to ignore. Suddenly you care about surface continuity, local smoothness, and whether the shape still looks like something a human would trust.

## Surface extraction is not just visualization

It is easy to treat mesh export as a nice bonus at the end of the pipeline. I do not think that is the right way to look at it.

Surface extraction is also a form of audit. Marching cubes or discrete marching cubes will tell you very quickly if the segmentation has holes, staircases, or strange protrusions. A mesh can expose failure modes that hide inside a volume rendering or a metric table.

## Why this matters in navigation-heavy settings

In something like lung CT preprocessing for navigation, the geometry matters because the output is going to be used as anatomy, not just as a benchmark result. You want a surface you can export, inspect in VTK, compare across cases, and use in later steps like registration or scene setup.

That changes what “good segmentation” means. It is no longer just the highest Dice on a validation set. It is the segmentation that survives conversion into usable geometry without falling apart.

## Meshes force better questions

Once you start caring about meshes, you start asking better questions about the whole pipeline.

Did resampling distort thin structures? Did smoothing erase something important? Is the segmentation stable enough that the mesh is not wildly different under small perturbations? Are the failure cases clinically awkward even when the average metric looks fine?

## Why I like keeping geometry in the loop

I think this is one reason I keep coming back to geometry-heavy medical imaging problems. Geometry is a good antidote to complacency.

A score can flatter a model. A mesh is a little less polite. It tends to show you what the pipeline actually produced.
