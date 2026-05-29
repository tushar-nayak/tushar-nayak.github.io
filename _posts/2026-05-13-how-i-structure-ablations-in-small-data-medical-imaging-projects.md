---
layout: post
title: "how i structure ablations in small-data medical imaging projects"
date: 2026-05-13 10:00:00
description: Why ablations in medical imaging need to be boring, disciplined, and suspicious of lucky splits.
tags: medical-imaging ablations small-data evaluation research
categories: research
featured_project: 15_project.md
---

Ablations are supposed to tell you what mattered. In small-data medical imaging, they can just as easily tell you what got lucky.

That is the annoying part. You can remove a component, see the metric change, and still not know whether the component helped or whether the split, seed, preprocessing, or case difficulty moved the result.

So I try to structure ablations in a way that is boring on purpose.

## Start with the failure mode

The first question should not be “what components can I remove?” It should be “what failure was this component supposed to fix?”

If a curvature loss is added to reduce jagged deformation, the ablation should inspect curvature or shape quality, not just average MSE. If multi-scale pathology features are added for context, the ablation should look at cases where context actually matters. If a mesh cleanup step is added, the ablation should inspect surface artifacts, not only Dice.

Ablations are much more useful when each component has a job.

## Keep the baseline honest

A weak baseline makes every method look good. That is especially dangerous in medical imaging, where datasets are small and pipelines have many moving parts.

Before adding clever components, the baseline should be strong enough to be annoying. Sensible preprocessing. Reasonable augmentations. Fair hyperparameters. Patient-wise splits. Proper validation. If the baseline is lazy, the ablation is basically theater.

This is why I like starting with the simplest system that I would not be embarrassed to defend.

## Change one thing at a time

This sounds obvious, but it is easy to violate.

You add a new loss and change the learning rate. You add a transformer and change the augmentation. You change the input representation and also change the sampling strategy. Then the result improves and nobody knows what caused it.

In small data, that gets even worse because random variation can look like progress. So the cleaner the comparison, the better.

## Report more than the headline metric

Ablations should include the metric that matches the reason the component exists.

For segmentation, Dice is useful but not enough. Boundary metrics, HD95, connected components, and visual audits can reveal whether the change actually improved the shape. For classification, sensitivity, specificity, calibration, and class-wise performance may matter more than accuracy. For reconstruction, reprojection error, surface distance, deformation plausibility, and task-level measurements can disagree.

That disagreement is useful. It tells you what the component is really doing.

## The ablation patterns I do not trust

The most common failure is the beautiful ablation table that explains nothing.

Every row changes by a small amount. The full model wins. The text says every component contributes. But there is no failure-mode analysis, no variance estimate, no case-level inspection, and no reason to believe the differences are stable.

That kind of table looks complete while being fairly weak evidence.

## The structure that held up better

In projects involving reconstruction, denoising, segmentation, and pathology, the ablations that helped most were usually the ones tied to a concrete behavior.

Does projection loss improve 2D consistency? Does smoothness reduce impossible geometry? Does multi-scale attention help cases where one magnification is ambiguous? Does mesh post-processing improve surface usability without shrinking anatomy?

Those questions are much better than “does module X improve Dice by 0.7?”

## The point of the whole exercise

A good ablation is not a checklist. It is an argument.

The argument should say: this component exists because the model fails in this way; when we remove it, that failure returns; when we include it, the behavior improves without breaking something else.

That is the kind of ablation I trust.

## What I would require in every ablation section

For small-data projects, I would include seed variation when possible, case-wise performance, and at least a few failure-case panels for each important component.

It is less compact than a neat table. But small-data medical imaging needs that extra skepticism. The model already has enough ways to fool you.
