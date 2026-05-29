---
layout: post
title: "what i look for in a strong medical ai research problem"
date: 2026-05-25 10:00:00
description: Why the best medical AI problems usually have a real bottleneck, a clear failure mode, and a workflow that needs the output.
tags: medical-ai research medical-imaging problem-selection biomedical-engineering
categories: research
---

A strong medical AI research problem is not just a medical dataset plus a neural network.

That combination can produce a project, but not necessarily a good one. The interesting problems usually have a real bottleneck, a technical reason the task is hard, and a workflow where the output would actually matter.

That is the filter I trust more now.

## The problem should have a reason to exist

The first question is simple: why does this need to be solved?

Not in the abstract sense where every medical task sounds important. Specifically, what is the bottleneck? Is annotation slow? Is imaging incomplete? Is the current workflow manual? Is the geometry hard to recover? Is the model failing under distribution shift? Is the output needed for planning, navigation, or measurement?

If the answer is vague, the project usually becomes vague too.

## The technical difficulty should be real

A good medical AI problem should not only be “apply model X to dataset Y.”

There should be a technical tension. Sparse observations. Noisy labels. Domain shift. Class imbalance. Missing views. Deformation. Weak supervision. Multi-scale context. Limited data. Difficult evaluation. A mismatch between the training target and the clinical artifact.

That difficulty is what makes the project worth doing. It also tells you what kind of method is justified.

## The output should have a downstream purpose

I like projects where the output is not just a number.

A segmentation that becomes a mesh. A reconstruction that supports registration. A denoised image that preserves boundaries for another model. A pathology classifier that can show evidence. A deformation estimate that updates a surgical roadmap.

The downstream use keeps the project honest. It forces you to ask whether the output is actually useful.

## The weak version of this kind of project

The weak version of a medical AI project starts with a dataset and ends with a leaderboard-style metric.

That can still be educational, but it often becomes hard to defend. The model improves a score, but the reason it matters is unclear. The failure modes are not analyzed. The clinical connection is mostly in the introduction. The output does not enter a real workflow.

Those projects can look complete while feeling shallow.

## The problems that felt worth keeping

The projects that felt strongest to me had a more specific pressure.

Sparse echo reconstruction was hard because 2D views underconstrain 3D shape. Lung CT segmentation became more useful when it produced geometry. Neural anisotropic diffusion mattered because denoising had to preserve anatomical edges. Deformable vessel reconstruction mattered because preoperative anatomy changes during intervention.

In each case, the method was motivated by a failure mode, not just by model novelty.

## The filter I now use

A strong medical AI problem has three ingredients:

There is a clinical or workflow bottleneck. There is a technical reason the obvious method struggles. There is an output artifact that can be evaluated in relation to its use.

When those three line up, the project usually has depth.

## The one paragraph I would force myself to write first

Before starting a new medical AI project, I would write a one-paragraph failure-mode statement.

What currently fails? Why does it fail? What information is missing? What constraint could help? What output would make the workflow better? How would I know if the method improved the right thing?

If that paragraph is hard to write, the project probably is not ready yet.
