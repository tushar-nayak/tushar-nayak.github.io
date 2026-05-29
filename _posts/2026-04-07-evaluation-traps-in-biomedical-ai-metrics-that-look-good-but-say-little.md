---
layout: post
title: "evaluation traps in biomedical ai: metrics that look good but say little"
date: 2026-04-07 10:00:00
description: Why high scores in biomedical AI can still leave you with a model that explains very little and generalizes even less.
tags: biomedical-ai evaluation xai metrics pathology medical-imaging
categories: research
---

Biomedical AI has a bad habit of producing numbers that look comforting before the model has really earned that comfort.

This is not me being anti-metrics. You obviously need metrics. The problem is that some of the most common ones become dangerously persuasive once the data, task, and deployment story get more complicated.

## Accuracy can hide boring shortcuts

If the dataset is imbalanced, accuracy can look excellent while the clinically important minority class gets treated badly. Everyone knows this in theory, but papers still lean on headline accuracy because it reads cleanly.

That is why sensitivity, specificity, precision, F1, ROC-AUC, and class-wise reporting matter. Even then, the numbers can still flatter the model if the split is easy or the data source is too homogeneous.

Calibration also gets ignored more than it should. A model can have decent ranking metrics and still assign confidence in a way that is wildly unhelpful. In biomedical settings, that matters because a system that is confidently wrong is often more dangerous than one that is modestly uncertain.

## Tile-level success can overstate pathology performance

Pathology is especially good at creating evaluation illusions. If you split at the tile level instead of the patient or slide level, the model can end up seeing almost the same specimen texture in both training and test. Then the score looks amazing and everyone acts surprised.

The model may still have learned something real, but the evaluation is no longer answering the question you think it is answering.

The same thing happens with augmentation and preprocessing leaks. If your normalization pipeline is tuned using information from the whole dataset, or if repeated crops from the same source specimen are spread across folds, the model gets quiet hints it should not have. These are not flashy mistakes, but they can easily inflate performance.

## Segmentation metrics do not guarantee usable outputs

Dice and IoU are useful, but they are not enough on their own. A segmentation can get a strong overlap score and still produce ugly boundaries, poor topology, or a surface that becomes awkward once converted into geometry.

That is why I like keeping surface-aware checks, distance metrics like HD95, and direct visual audits in the loop. If the downstream artifact is a shape, then the evaluation should eventually look at shape, not just overlap.

Another trap is reporting only macro numbers on anatomies with very uneven difficulty. Large easy structures dominate. Small difficult boundaries get washed out. So if the method is supposed to support surgery, planning, or measurement, I want to know where the errors live spatially, not just what the average says.

## Classification scores do not tell you why the model won

This is where the explainability angle matters, and it is one reason I still think the XAI work from my earlier Manipal projects was useful.

When a classifier gets a great score on skin lesions, blood smears, or pathology images, you still want to know what it is using. If a Grad-CAM or related explanation consistently highlights clinically irrelevant corners, background artifacts, or stain quirks, that high accuracy starts feeling a lot less impressive.

Explainability is not a magic safety certificate, but it is a good way to catch models that are winning for the wrong reasons.

I also think explainability is most useful when it is used adversarially rather than ceremonially. Not “look, the heatmap exists,” but “does this explanation make me more suspicious of the model?” If the answer is yes, that is already valuable. It means the explanation did its job.

## External validity is the actual exam

The trap with many biomedical AI results is that the metric is answering, “how well did this model fit this dataset under this split?” The real question is closer to, “what happens when the scanner changes, the stain varies, the patient population shifts, or the workflow gets less curated?”

That is why cross-site validation, patient-wise splits, calibration checks, and failure-case inspection matter so much more than a single pretty number in isolation.

And if the model is meant to be used interactively or as decision support, latency and failure transparency matter too. A model that is slightly more accurate but opaque, brittle, and hard to interrogate may be worse than a simpler one that exposes its limits.

## Why I am suspicious of neat tables

A clean result table is fine. I just do not trust it by default anymore.

If the evaluation does not tell me how the split was constructed, whether the model is looking at the right regions, what the bad cases look like, and whether the metric matches the downstream use case, then the score is only half speaking. Sometimes less than half.
