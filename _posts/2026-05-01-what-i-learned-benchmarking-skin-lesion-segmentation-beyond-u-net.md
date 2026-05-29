---
layout: post
title: "what i learned benchmarking skin lesion segmentation beyond u-net"
date: 2026-05-01 10:00:00
description: Why comparing skin lesion segmenters is less about naming the newest architecture and more about finding the failure modes.
tags: skin-lesion segmentation medical-imaging u-net benchmarking
categories: research
featured_project: 15_project.md
---

Skin lesion segmentation is a very good problem for learning that better architecture names do not automatically mean better medical imaging systems.

It looks like a clean task. Input dermoscopy image, output lesion mask, compute Dice or IoU. But once you benchmark models properly, the problem starts becoming less about U-Net versus not-U-Net and more about whether the method survives the boring mess of real images.

## U-Net is hard to beat for a reason

The first thing I learned is that U-Net-style baselines are still strong because they match the structure of the task well.

You have local texture, boundaries, multi-scale features, and a dense pixel output. Encoder-decoder models with skip connections are a very natural fit. So when a newer model beats U-Net, I want to know exactly where it beats it. Is it better on small lesions? Fuzzy boundaries? Low-contrast cases? Hair occlusion? Dark skin? Strong artifacts? Or is it just slightly better on average?

That distinction matters because a benchmark win without a failure-mode story is not very informative.

## The boundary is usually the problem

In skin lesion segmentation, the easy part is often finding the general lesion region. The hard part is the boundary.

Some lesions fade gradually into surrounding skin. Some have irregular borders. Some have lighting artifacts, hair, rulers, bubbles, or acquisition differences. A model can get the center right and still be clinically awkward near the edge.

This is why Dice can feel too forgiving. If the lesion is large, a model can score well while still making boundary mistakes that would matter for measurement or follow-up. Surface distance and boundary-focused inspection make the failures much more visible.

## Where the benchmark story gets thin

The flashy failure is when the model misses the lesion. The more interesting failure is when it segments the wrong confidence.

Some models produce smooth masks that look stable but cut off uncertain edges. Some over-segment into surrounding skin because texture changes look lesion-like. Some are brittle under artifacts. Some do well on canonical images and then quietly struggle on cases that look slightly outside the training distribution.

The other failure is evaluation leakage. If the dataset split is not careful, or if preprocessing is tuned too heavily on the full dataset, the benchmark can become easier than the deployment problem. That is not unique to skin lesions, but it shows up clearly here.

## What comparing models actually looked like

The useful exercise was not just training one model. It was comparing a baseline U-Net-style setup against stronger segmentation variants and then looking at what actually changed.

The model comparison itself was only part of the story. The more useful part was the inspection loop: overlay predictions, look at boundary errors, check hard cases, compare metric disagreement, and ask whether the improvement was consistent or just averaged out.

That changed how I thought about “beyond U-Net.” The goal is not to replace U-Net because it is old. The goal is to understand what the baseline cannot do and choose a method that addresses that specific limitation.

## Architecture is not the only lever

A lot of segmentation improvement comes from things that do not sound exciting.

Better resizing. Better normalization. Careful augmentation. Boundary-aware losses. Patient- or source-aware splits. Test-time inspection. Clear failure categories. These choices can matter as much as swapping the encoder.

That is especially true in small medical datasets. A bigger model can help, but it can also just overfit more confidently.

## The sharper question

Benchmarking beyond U-Net taught me to ask a sharper question: what exactly is the newer model better at?

If the answer is only “the mean Dice went up,” I am not satisfied. I want to know whether the model improves the hard boundaries, handles artifacts better, generalizes across acquisition conditions, and fails in a way that is easier to detect.

## How I would make the benchmark less superficial

The next version of a skin lesion benchmark should include boundary metrics, calibration, artifact-stratified performance, and examples of the worst cases instead of only the best overlays.

That would make the comparison less clean, but much more useful. And honestly, that is the point of a benchmark.
