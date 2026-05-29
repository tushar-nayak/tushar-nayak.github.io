---
layout: post
title: "why i keep returning to geometry in biomedical ai"
date: 2026-05-20 10:00:00
description: Why labels are useful, but shape, pose, deformation, and spatial structure keep feeling like the real problem.
tags: geometry biomedical-ai medical-imaging 3d-vision robotics
categories: research
---

I keep returning to geometry because a lot of biomedical AI becomes more honest when the output has a shape.

Classification is useful. Segmentation is useful. But the problems I find most interesting usually ask for more than a label. They ask where something is, how it is shaped, how it moved, how it deformed, or whether it can be used downstream.

That is geometry.

## Geometry makes errors harder to hide

A classification model can be wrong in a way that is difficult to inspect. A segmentation mask can get a good overlap score while still having ugly boundaries. But a mesh, a centerline, a deformation field, or a reconstructed surface is less polite.

You can rotate it. You can measure it. You can see when it breaks. You can ask whether it looks like anatomy or like a model trying to pass a metric.

That kind of visibility matters.

## Medical workflows need spatial outputs

Many clinical tasks are spatial by nature.

Surgical navigation needs geometry. Radiation planning needs geometry. Registration needs geometry. Simulation needs geometry. Longitudinal tracking needs geometry. Intervention needs geometry that updates when the patient or anatomy changes.

A label can support those tasks, but it is rarely the final artifact. At some point, the model has to produce something with position, scale, shape, or motion.

## Deformation is where geometry gets real

Rigid geometry is already useful. Deformable geometry is where the problem becomes much more clinical.

Anatomy does not stay still. Vessels bend. Organs shift. Soft tissue compresses. The preoperative model becomes less true over time. If the system ignores that, it can remain visually convincing while becoming spatially wrong.

That is why deformation keeps pulling me in. It forces the model to stop treating images as isolated frames and start treating anatomy as a physical thing.

## The kinds of shortcuts geometry exposes

The failure mode of ignoring geometry is that the model solves the visible task but not the useful one.

A classifier predicts the right class but gives no spatial explanation. A segmentation predicts a mask but produces a broken surface. A reconstruction renders well but cannot be measured. A registration aligns a view but violates plausible deformation.

Those failures are easy to miss if you only evaluate the simplest output.

## The projects that kept proving the point

A lot of my projects have drifted toward geometry even when they started somewhere else.

Pathology work raised questions about spatial context. Lung segmentation led naturally to surface extraction. Echo reconstruction became about sparse 2D evidence and 3D shape. Vessel deformation became about centerlines, projection losses, and physically plausible updates. Denoising became interesting because it protected edges rather than just smoothing pixels.

The same theme keeps showing up: the model is more useful when it respects structure.

## Why this keeps pulling me back

Geometry is not just a visualization layer. It is a way of forcing the model to make stronger claims.

A label says what. Geometry says where, how much, how connected, how smooth, how deformed, and sometimes how usable. That is a much richer standard.

## Where I want to keep following this thread

I want to build more systems where geometry is present throughout the pipeline, not only at the end.

That means representations that preserve shape, losses that penalize impossible structure, evaluation that inspects surfaces and centerlines, and outputs designed for navigation or planning rather than just a result table.

That is where biomedical AI starts feeling less like pattern recognition and more like a tool for understanding anatomy.
