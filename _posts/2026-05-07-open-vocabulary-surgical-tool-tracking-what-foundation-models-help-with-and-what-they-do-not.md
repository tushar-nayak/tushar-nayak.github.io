---
layout: post
title: "open-vocabulary surgical tool tracking: what foundation models help with and what they do not"
date: 2026-05-07 10:00:00
description: Why foundation models are useful for surgical tool understanding, but not a replacement for tracking, geometry, and temporal discipline.
tags: surgical-vision foundation-models tool-tracking open-vocabulary robotics
categories: research
featured_project: 16_project.md
---

Open-vocabulary surgical tool tracking sounds like exactly the kind of problem foundation models should make easier.

Instead of training a detector for every tool class under every lighting condition, you ask a large model to recognize tools from language, visual examples, or broad pretraining. That is genuinely useful. But it does not solve the whole problem.

Surgical tool tracking is not just naming the object in the frame. It is maintaining a stable, useful estimate of where the tool is, what it is doing, and how it interacts with anatomy over time.

## Recognition is not tracking

Foundation models are good at broad recognition. They can help identify object categories, handle varied appearances, and provide a better starting point than training everything from scratch.

But tracking asks for temporal commitment. The tool should not flicker between labels. The mask should not jump around. The tip should stay stable. If the tool becomes partially occluded, the tracker should not forget it immediately. If lighting changes, the output should not suddenly drift.

A model that recognizes a tool in one frame is useful. A model that maintains a reliable tool state through the procedure is a different thing.

## The tip matters more than the label

In surgery, the clinically important part is often not the whole tool. It is the tip, jaw, shaft, or contact point.

A foundation model might segment the general tool region, but that does not automatically give you the precise geometry needed for guidance. A bounding box around a grasper is not the same as knowing where the active tip is. A mask is not the same as pose. A label is not the same as interaction.

That is why tool tracking quickly becomes a geometric problem.

## What foundation models help with

They help with initialization, generalization, and annotation efficiency.

If you need to bootstrap labels for surgical video, a foundation model can reduce the amount of manual work. If the tool appearance varies across cases, broad pretraining can make the model less brittle. If you want to search for tool-like objects without a fixed closed vocabulary, open-vocabulary models are a reasonable starting point.

They also help expose a useful question: how much of the task is semantic recognition, and how much is surgical state estimation?

For many workflows, the answer is that semantics are only the first layer.

## What they do not solve

They do not automatically solve calibration. They do not recover metric 3D pose by themselves. They do not guarantee temporal stability. They do not know which failure modes are dangerous. They do not understand the full physical interaction unless the system is designed to represent it.

They can also be overconfident in unfamiliar surgical scenes. A model trained broadly on internet-scale data may know what a tool roughly looks like, but surgical video has its own visual rules: unusual lighting, narrow fields of view, specular tissue, smoke, blood, occlusion, and tool-artifact combinations that are not common in normal images.

## The flashy but weak version

The likely failure mode is treating open-vocabulary detection as the final product.

You get impressive qualitative outputs, but the masks are not stable enough. The labels are too coarse. The tip localization is not precise. The tracker fails during occlusion. The model notices the tool but not the clinically relevant part of the tool.

That is not a reason to ignore foundation models. It is a reason to place them correctly in the system.

## Where foundation models actually fit

Foundation models are best viewed as perception components, not surgical reasoning systems.

They can give strong visual priors and reduce annotation burden. But surgical tool tracking still needs temporal filtering, geometry, calibration, task-specific definitions, and evaluation that cares about the active part of the instrument.

## The layered system I would build instead

I would build the system in layers: foundation model for proposal generation, task-specific refinement for surgical tool parts, temporal tracking for stability, and geometry-aware estimation for tip or pose.

Then I would evaluate not just detection quality, but tracking continuity, tip error, occlusion recovery, and downstream usefulness.

That is a less flashy story than “foundation model solves surgical tracking.” It is also the version I would actually trust.
