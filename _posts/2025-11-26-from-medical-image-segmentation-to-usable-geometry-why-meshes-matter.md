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

That distinction matters because voxel grids are tied to sampling. Their boundaries are staircase boundaries by construction. A mesh gives you something closer to the underlying surface the mask was trying to describe. It is still an approximation, of course, but it is usually a much better approximation for downstream geometry tasks.

## Why voxel overlap is only part of the story

A segmentation can score well and still give you ugly geometry. Jagged boundaries, stair-step artifacts, disconnected islands, weird local bumps, or topological glitches do not always hurt overlap metrics that much, especially on large structures.

But once you convert that label map into a mesh, those problems become hard to ignore. Suddenly you care about surface continuity, local smoothness, and whether the shape still looks like something a human would trust.

This is one reason HD95 and related surface-distance metrics help. They are still summary numbers, so they are not magic, but at least they react more directly to boundary error than Dice alone. If two masks have similar overlap and one of them produces a much worse surface distance, that usually tells you which one will be more annoying once you extract the mesh.

## Surface extraction is not just visualization

It is easy to treat mesh export as a nice bonus at the end of the pipeline. I do not think that is the right way to look at it.

Surface extraction is also a form of audit. Marching cubes or discrete marching cubes will tell you very quickly if the segmentation has holes, staircases, or strange protrusions. A mesh can expose failure modes that hide inside a volume rendering or a metric table.

And then there is smoothing, which sounds harmless until it is not. A bit of surface smoothing can clean up aliasing from discretization. Too much smoothing can erase small but real structure, shrink thin regions, or make the anatomy look nicer while becoming less faithful. So even the mesh cleanup stage has to be treated like part of the measurement chain, not just cosmetic post-processing.

## Why this matters in navigation-heavy settings

In something like lung CT preprocessing for navigation, the geometry matters because the output is going to be used as anatomy, not just as a benchmark result. You want a surface you can export, inspect in VTK, compare across cases, and use in later steps like registration or scene setup.

That changes what “good segmentation” means. It is no longer just the highest Dice on a validation set. It is the segmentation that survives conversion into usable geometry without falling apart.

If the surface is going into a registration or planning pipeline, mesh quality affects numerical behavior too. Non-manifold patches, tiny disconnected components, rough boundaries, or inconsistent normals can make downstream tools behave strangely. That is another reason I do not see mesh generation as a decoration step. It is part of whether the pipeline is technically usable.

## Meshes force better questions

Once you start caring about meshes, you start asking better questions about the whole pipeline.

Did resampling distort thin structures? Did smoothing erase something important? Is the segmentation stable enough that the mesh is not wildly different under small perturbations? Are the failure cases clinically awkward even when the average metric looks fine?

## Why I like keeping geometry in the loop

I think this is one reason I keep coming back to geometry-heavy medical imaging problems. Geometry is a good antidote to complacency.

A score can flatter a model. A mesh is a little less polite. It tends to show you what the pipeline actually produced.
