---
layout: post
title: "turning segmentation masks into 3d anatomical surfaces for navigation workflows"
date: 2026-04-30 10:00:00
description: Why the step from mask to mesh is where a segmentation project starts becoming useful anatomy.
tags: medical-imaging segmentation meshes vtk navigation geometry
categories: research
featured_project: 12_project.md
---

A segmentation mask feels like an endpoint until you try to use it for navigation.

Then it becomes obvious that the mask is only an intermediate artifact. It tells you which voxels belong to the structure, but it does not automatically give you a surface that another tool, planner, simulator, or navigation system can use cleanly.

That is where the mask-to-surface step becomes more important than it first looks.

## The mask is still tied to the voxel grid

A label map is a great representation for training and evaluation. It is easy to store, easy to compare, and easy to feed into medical imaging libraries.

But it is still a voxel object. Its boundary is tied to the resolution, spacing, interpolation history, and orientation of the original image. If you zoom in, the anatomy becomes a staircase. If the spacing is anisotropic, the staircase can get worse. If preprocessing was careless, the geometry can quietly drift away from physical space.

For navigation workflows, that is a problem. You usually want a surface you can rotate, measure, register, smooth, decimate, and export. You want anatomy as geometry, not just anatomy as labels.

## Surface extraction is where errors become visible

Marching cubes is often treated like a button you press at the end. I think it is better to treat it as an audit.

Once the mask becomes a mesh, bad boundaries stop hiding. Tiny disconnected islands become obvious. Holes show up. Rough surfaces look rough. Weird protrusions suddenly look very weird. A segmentation that looked acceptable in a slice viewer may become much less convincing as a 3D object.

That is useful. It means the surface export step is not just visualization. It is a diagnostic tool for the pipeline.

## Smoothing is not automatically safe

The next temptation is to smooth the mesh until it looks nice. That helps with voxel aliasing, but it can also lie.

If you smooth too much, you can shrink anatomy, erase thin structures, round off clinically meaningful shape, or make a failed segmentation look more plausible than it deserves. This is especially dangerous if the surface will be used for registration or measurement.

So the cleanup step needs to be treated as part of the method, not a cosmetic filter. The question is not “does it look better?” The question is “is it more usable without becoming less faithful?”

## What the full pipeline actually has to do

In the lung CT pipeline, the useful part was connecting the whole chain: load the scan with proper spatial metadata, segment the lung region, save the prediction, extract a surface using VTK, smooth it carefully, and export it in formats that downstream tools can actually read.

That is a simple sentence, but each transition matters.

SimpleITK keeps the medical image geometry honest. MONAI handles the segmentation model and inference. VTK handles the polygonal surface. The pipeline only works if the handoff between those worlds preserves spacing, orientation, and scale.

This is exactly where one-off notebooks can become fragile. The model may work, but the exported object is flipped, scaled incorrectly, disconnected, or too rough to use.

## Where this usually goes sideways

The most common failures were not dramatic model failures. They were pipeline failures.

A mask could be mostly right but produce a surface with small islands. A surface could look clean but be too dense for convenient inspection. A smoothing setting could remove aliasing but also shrink boundaries. A resampling choice could make the network easier to train but make thin structures less faithful.

Those are annoying problems because they sit between machine learning and geometry. They are not solved by a better backbone alone.

## The main point

Turning masks into surfaces forces you to define what “good” means more carefully.

For a paper, good might mean high Dice. For a navigation workflow, good means the exported geometry is stable, physically scaled, inspectable, and compatible with whatever comes next. Those are related goals, but they are not identical.

## What deserves better evaluation

The next version of this kind of pipeline should include mesh quality metrics as first-class outputs. Not just Dice and HD95, but connected component counts, surface area changes after smoothing, mesh density, non-manifold checks, and maybe registration stability downstream.

If the end product is anatomy as geometry, the evaluation should inspect it like geometry.
