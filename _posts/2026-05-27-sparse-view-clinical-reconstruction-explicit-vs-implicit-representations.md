---
layout: post
title: "sparse-view clinical reconstruction: explicit vs implicit representations"
date: 2026-05-27 10:00:00
description: Why sparse clinical reconstruction makes representation choice feel less like taste and more like a failure-mode decision.
tags: sparse-view-reconstruction 3d-vision medical-imaging implicit-fields geometry
categories: research
featured_project: 17_project.md
---

Sparse-view clinical reconstruction is a very good way to stop treating 3D representations like interchangeable containers.

When you only have a few views, the representation is not just storing the answer. It is shaping the answer. It decides which solutions are easy, which are awkward, which are impossible, and which failures are hidden until too late.

That is why explicit versus implicit representations matter so much here.

## Explicit representations give you something you can inspect

Meshes, point clouds, centerlines, and graphs are comforting because they are already geometry.

You can look at them, measure them, export them, compare them, and pass them into downstream tools. If the output is meant for navigation, planning, or simulation, explicit geometry has an obvious advantage: it already lives in the world of the next step.

The downside is that sparse clinical views do not always supervise explicit geometry easily. If you do not know the full surface, directly optimizing vertices can become brittle. If topology changes, meshes get annoying. If correspondences are unclear, the representation starts fighting the data.

Explicit geometry is great when the artifact is clear. It is harder when the evidence is indirect.

## Implicit representations are flexible because they delay commitment

Implicit fields are attractive because they represent shape continuously. Instead of storing a fixed mesh, the model learns a function that tells you occupancy, signed distance, or density at any point.

That is useful when supervision comes from slices, projections, or partial observations. You can ask the field what it predicts in the observed planes and leave the full surface extraction for later.

The problem is that this flexibility can hide mistakes. A smooth implicit field can look plausible while filling unobserved regions incorrectly. It can satisfy sparse views and still invent anatomy between them.

That is the central tradeoff: implicit fields are easier to optimize under indirect evidence, but harder to trust without strong priors and inspection.

## Sparse views make priors unavoidable

With dense observations, the representation has less freedom to hallucinate. With sparse clinical views, the missing information becomes the main problem.

That means the representation is also a prior. A mesh prior may encourage surface continuity. A centerline graph may preserve vessel topology. An implicit network may encourage smoothness. A Gaussian occupancy representation may encourage localized support.

None of those priors is neutral. Each one biases the reconstruction in a different way.

## How each representation fools you differently

The failure mode for explicit representations is rigidity. They can be too committed too early, especially if the topology or correspondence is not settled.

The failure mode for implicit representations is slipperiness. They can explain the sparse observations while hiding bad geometry inside the field.

Both can produce nice figures. Both can fail downstream.

That is why the choice should be based on what kind of failure you can detect and tolerate.

## Why this kept coming back in practice

In sparse cardiac and vessel reconstruction work, the representation question kept coming back.

For echo, implicit and Gaussian-style occupancy methods make sense because the evidence is sparse 2D slices and the final 3D shape needs to be inferred. For vessels, centerlines and meshes matter because connectivity and geometry are downstream requirements. For deformation, control points and graph-like structures become useful because they make the physical change easier to constrain.

The representation changes because the task changes.

## The representation rule I trust now

There is no best representation in the abstract.

Explicit geometry is usually better when you need an artifact now. Implicit fields are useful when the supervision is sparse and indirect. Gaussian-style representations are interesting when you want differentiable image-space fitting but still want localized 3D support.

The real question is not which one is more modern. It is which one fails in a way you can understand.

## How I would evaluate a hybrid setup

For sparse clinical reconstruction, I would use hybrid evaluation even if the model uses one internal representation.

If the model is implicit, extract meshes and inspect geometry. If the model is explicit, test projection consistency. If the model is Gaussian-style, evaluate both image-space fit and geometry-space localization.

Sparse reconstruction is too underconstrained to trust one view of quality. The representation should be judged by whether it survives all of them.
