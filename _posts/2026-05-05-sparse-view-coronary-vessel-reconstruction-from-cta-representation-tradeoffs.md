---
layout: post
title: "sparse-view coronary vessel reconstruction from cta: representation tradeoffs"
date: 2026-05-05 10:00:00
description: Why coronary reconstruction depends as much on representation choice as it does on the model.
tags: cta coronary-reconstruction 3d-vision vessels geometry
categories: research
featured_project: 8_project.md
---

Sparse-view coronary vessel reconstruction is one of those problems where the representation choice quietly decides half the project.

You are not just asking a model to produce a nice 3D output. You are asking it to recover thin, branching, patient-specific geometry from incomplete evidence. That is a very good way to expose the weaknesses of whatever representation you picked.

## Vessels are annoying geometry

Vessels are thin, connected, branching, and locally smooth until they are not. They taper. They curve. They bifurcate. They may be poorly contrasted. They can disappear in noisy regions. Small errors can matter because the structure itself is small.

That makes them different from large organ segmentation. If a liver mask is off by a few voxels, the overall shape may still be acceptable. If a coronary branch is broken, the topology of the anatomy has changed.

So the representation has to care about more than volume occupancy. It has to preserve connectivity, radius, centerline structure, and spatial scale.

## Explicit centerlines are interpretable but brittle

A centerline representation is attractive because it describes what you often care about directly: path, branching, radius, and connectivity.

That is very useful for downstream analysis. You can measure branch length, curvature, tortuosity, radius, and graph structure. You can compare predicted and reference trees in a meaningful way.

The downside is that centerlines can be brittle. Extracting them from noisy segmentations is not always stable. Small mask errors can create missing branches or spurious branches. If the reconstruction model predicts a graph directly, correspondence and topology become hard very quickly.

So centerlines are excellent artifacts, but not always the easiest thing to optimize from sparse image evidence.

## Meshes are usable but heavy

Meshes are great once the anatomy is already segmented or reconstructed well. They give you a surface you can inspect, smooth, export, and register.

But for sparse-view reconstruction, optimizing a mesh directly can be awkward. You have to deal with topology, vertex correspondence, resolution, and surface quality. Coronary vessels also need enough resolution to represent thin branches without becoming too heavy.

Meshes make sense as an output. They are not always the easiest internal representation.

## Implicit fields are flexible but slippery

Implicit fields are tempting because they can represent continuous geometry and handle complex shapes without committing to a fixed mesh early.

That flexibility helps when the supervision is sparse or indirect. You can query the field in 3D, supervise through slices or projections, and extract a surface later.

The problem is that implicit fields can produce smooth nonsense. If the vessel evidence is weak, the field may fill gaps incorrectly, merge nearby structures, or lose small branches. Thin anatomy is especially unforgiving because the field has to localize the boundary precisely in a very small region of space.

## Gaussian-style representations are interesting for locality

Gaussian occupancy or splat-style representations are appealing because they give you soft, optimizable primitives that still live in 3D space.

For vessels, that locality is useful. You can imagine primitives following the vessel tree, carrying local scale information, and being optimized under projection or volume supervision. Compared to a fully implicit network, there is something inspectable about where the support is being placed.

The risk is fuzziness. If the Gaussians are too broad or too weakly regularized, the vessel stops looking like a crisp structure and starts looking like a probability cloud.

## The easiest way to pick the wrong representation

The main failure is choosing a representation because it is fashionable instead of because it matches the failure mode.

If the method needs connectivity, a pure occupancy field may hide branch breaks. If the method needs differentiable projection, a raw graph may be awkward. If the method needs exportable anatomy, a representation that never becomes a good surface is not enough.

Sparse coronary reconstruction punishes that mismatch very quickly.

## The decision rule I trust

The right representation depends on what you need to preserve.

For coronary vessels, I care about centerline geometry, branch topology, local radius, and surface usability. That means I do not want to think about segmentation, reconstruction, and mesh export as separate worlds. The representation has to survive the whole path.

## The version I would actually trust downstream

The version I would trust most is probably hybrid: learn a soft 3D representation for optimization, extract centerlines and surfaces for evaluation, and regularize using vessel-specific constraints like connectivity, radius smoothness, and curvature.

That is less elegant than picking one representation and declaring victory. It is also much closer to the actual problem.
