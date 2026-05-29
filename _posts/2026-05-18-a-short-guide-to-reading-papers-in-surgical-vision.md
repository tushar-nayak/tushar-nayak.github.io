---
layout: post
title: "a short guide to reading papers in surgical vision"
date: 2026-05-18 10:00:00
description: How I try to read surgical vision papers without getting distracted by clean diagrams and impressive demos.
tags: surgical-vision paper-reading research medical-imaging robotics
categories: research
---

Surgical vision papers are easy to read too politely.

The diagrams look clean. The demo videos look convincing. The metrics look better than the previous method. The clinical motivation sounds obvious. It is tempting to nod along and move on.

I try not to do that anymore.

## Start with the actual signal

The first thing I ask is: what does the method actually see?

Endoscopic RGB video, fluoroscopy, ultrasound, CT, MRI, tool kinematics, robot state, segmentation masks, stereo, depth, synthetic data, or some combination of these. This matters because the input modality decides what information is missing.

If the method uses fluoroscopy, depth is collapsed. If it uses endoscopy, internal anatomy is hidden. If it uses ultrasound, the field of view and noise are serious constraints. If it uses preoperative CT, the scan may no longer match intraoperative anatomy.

A surgical vision paper is really a paper about what can be inferred from incomplete evidence.

## Then ask what changed

In surgery, the scene is not static. So I ask whether the method accounts for deformation, motion, occlusion, tool interaction, or changing appearance.

If the paper assumes rigidity, that may be fine for some tasks. But I want to know where that assumption breaks. If the anatomy deforms and the method does not model deformation, the result may still look good in a controlled setup while failing in the real scenario that matters.

## Look at the supervision

The next question is what the model was trained to predict and how that target was obtained.

Manual labels? Synthetic labels? Simulation? Pseudo-labels? Robot kinematics? Registration-derived ground truth? Expert annotations? Public benchmark labels?

In surgical vision, ground truth is often expensive, indirect, or imperfect. That does not make the paper bad. It just means the supervision story deserves attention.

## Do not trust the metric alone

I want to know whether the metric matches the workflow.

If the paper reports segmentation Dice, is the mask meant for visualization, registration, navigation, or measurement? If it reports reprojection error, does the 3D geometry make sense? If it reports rendering quality, is the recovered surface actually useful? If it reports detection accuracy, is the tool tip stable enough?

The metric should evaluate the thing the method claims to support, not just the easiest output to score.

## How I used to read these papers badly

The failure is getting impressed by the wrong part.

A method can have a beautiful video and still be geometrically weak. A benchmark win can hide unrealistic assumptions. A synthetic dataset can be useful but not cover the real failure modes. A reconstruction can render well and still be a bad surface.

Reading too quickly makes all of that easy to miss.

## The reading habit that changed things

For surgical vision, I try to read papers as systems papers, even when they are presented as model papers.

Input assumptions, calibration, timing, deformation, supervision, evaluation, and workflow fit all matter. The architecture is important, but it sits inside those constraints.

## How I would teach someone else to read them

When reading a new surgical vision paper, I would keep a small checklist:

What does the method observe? What is hidden? What is assumed rigid? What changes during the procedure? What is the supervision? What does the metric actually prove? What would happen under occlusion, deformation, or domain shift?

That checklist does not make the reading slower in a bad way. It makes it more honest.
