---
layout: post
title: "why pathology ai is not just classification on patches"
date: 2026-04-28 10:00:00
description: Why pathology models need context, scale, and careful evaluation before their scores mean very much.
tags: pathology histopathology medical-ai classification context
categories: research
featured_project: 19_project.md
---

Pathology AI is very easy to undersell if you describe it as patch classification.

Take a whole-slide image, cut it into tiles, train a classifier, aggregate the predictions. That sounds clean, and sometimes it is a useful starting point. But it also hides most of what makes pathology interesting.

A patch is not the specimen. It is a small view into a much larger biological and diagnostic context.

## The patch is only a local clue

A tile can contain useful information. Nuclear morphology, gland structure, mitotic activity, necrosis, inflammation, staining patterns, and tissue texture can all show up locally.

But the diagnostic meaning of those features often depends on where the tile sits in the slide. A region that looks suspicious up close can be less meaningful once you see the broader architecture. A region that looks ordinary in isolation can become important because of its relationship to surrounding tissue.

That is why patch classification can feel deceptively strong. The model may learn local signals that correlate with the label, but the pathologist is usually doing more than that. They are moving between magnifications, comparing regions, and building a case-level interpretation.

## Scale changes the answer

Magnification matters a lot in pathology. Low magnification gives you architecture. High magnification gives you cellular detail. Neither one is enough by itself for every task.

If the model only sees small high-resolution crops, it may miss the tissue organization that makes those crops meaningful. If it only sees low-resolution global context, it may miss the fine morphology that separates one class from another.

This is why multi-scale modeling is not just a fancy architecture choice. It is closer to the actual way the problem works. The model needs to see structure and detail, not pretend one scale is the whole story.

## The labels are not always local

Another awkward part is label granularity. Many datasets give you slide-level or patient-level labels, but the model trains on tiles. That creates a mismatch.

A slide labeled malignant does not mean every tile is malignant. A tile from a positive case can be normal tissue, background, artifact, or a non-diagnostic region. If you train as if every tile inherits the slide label cleanly, the model is forced to learn from noisy supervision.

Multiple-instance learning is one way to deal with that, but the broader point is simple: the label often belongs to the case, not the crop. The crop is evidence, not the final answer.

## Where the patch-only story breaks

The simple patch pipeline fails in predictable ways.

It can learn stain differences instead of disease. It can learn scanner artifacts. It can overfit to tissue preparation style. It can look amazing if tiles from the same patient leak across train and test. It can assign high confidence to patches that are not clinically meaningful. And because patches are small, the failure can be hard to notice unless you inspect where the model is looking.

That is why explainability matters here, but not as decoration. A heatmap is useful when it makes you more suspicious. If the model is consistently focusing on blank regions, tissue folds, pen marks, or stain quirks, the high score is suddenly much less comforting.

## The practical version of the problem

Most of my pathology work started from the more obvious classification framing, because that is where many projects begin. The useful part came from realizing that the classifier was only one piece of the problem.

Multi-scale inputs, patient-wise splits, class-wise metrics, and explanation maps all changed how I interpreted the results. They made the question less about whether the network could produce a number and more about whether the model was using the right evidence.

That distinction matters. A model that performs well for the wrong reason is not a small problem in pathology. It is the entire problem.

## The takeaway

Pathology AI is not just classification on patches because the biological signal is distributed across scale, space, and context. The model needs local morphology, global architecture, clean evaluation, and some way of exposing what evidence it used.

Patch classification is a useful tool. It is not the whole workflow.

## What would make this more useful

For future pathology work, I would start with the evaluation design before the model design. Patient-wise splitting, site-aware testing, stain variation, slide-level aggregation, calibration, and explanation-based audits should not be late additions.

Only after that would I worry about whether the backbone is a CNN, a transformer, or a foundation model. In pathology, the architecture is rarely the first thing that can fool you.
