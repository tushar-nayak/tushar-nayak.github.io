---
layout: post
title: "histopathology classification at multiple scales: why context changes everything"
date: 2026-03-18 10:00:00
last_updated: 2026-05-27 10:00:00
description: Why looking at pathology at more than one magnification can change the answer entirely.
tags: pathology histopathology multi-scale classification deep-learning
categories: research
featured: true
featured_project: 19_project.md
---

Pathology is one of those places where the answer changes depending on how far in you zoom.

At low magnification, you see the bigger layout of the tissue. At high magnification, you start seeing the cellular details that separate one class from another. If you only use one view, you are basically asking the model to guess with part of the story missing.

## Why context keeps changing the answer

That is why multi-scale histopathology matters.

A patch can look pretty normal at one zoom level and look very different at another. The reverse happens too. Something that looks suspicious up close can make more sense once you zoom out and see how it fits into the whole slide. That is what makes pathology different from a lot of standard image classification problems. The model is not just reading texture. It is reading context.

And context here is not some vague nice-to-have thing. It is the difference between seeing gland structure and seeing nuclear detail. One scale tells you about architecture. The other tells you about cell-level morphology. If you collapse that into a single magnification and hope the network figures it out, you are usually just throwing away useful information before training even begins.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_thumbnails/lobe-ranger.png" title="Multi-scale histopathology model preview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
The point of multi-scale pathology is pretty simple: zoom out for structure, zoom in for detail, then let both views argue with each other a bit.
</div>

## Why scale matters

If you only give it a tiny crop, it can miss the larger pattern. If you only give it the full slide at low resolution, it can miss the fine details that actually matter. So the useful middle ground is to keep both. That is why this project uses 20x and 40x views together instead of forcing one magnification to do all the work.

This is also one of those cases where “more resolution” is not the same thing as “more information.” A 40x crop has more pixels, but it can still miss the surrounding tissue pattern that makes the crop interpretable. Likewise, a 20x view gives you structure but can wash out the details that separate one subtype from another. The scales are not redundant. They are answering different questions.

## What the model is actually doing

The setup is simple enough to explain in one sentence: extract features from both scales, let them interact, and then make the prediction from the combined representation. The shared ViT backbone handles the feature extraction, and cross-scale attention helps the model figure out what matters more in each region. Sometimes the 20x view gives you the overall structure, and the 40x view explains the weird-looking part inside it.

That interaction step matters a lot. If you only concatenate features at the end, you are basically asking the classifier head to clean up the disagreement between scales. Cross-scale attention is better because it lets one magnification inform what the other should pay attention to. The lower-magnification branch can provide spatial context, while the higher-magnification branch can sharpen what that context actually means.

There is also a data-splitting trap in pathology that makes this kind of work easy to overstate. If tiles from the same patient leak across train and test, the model can look incredible without really learning transferable disease cues. So multi-scale classification is not just about architecture. It also depends on patient-wise pairing, stain variability, and evaluation that respects slide-level structure.

## Why context changes the answer

What I like about this problem is that it feels closer to how a person would actually look at a slide. You zoom out first to get the layout, then zoom in to check the details, and then you use both before making a call. That is basically the whole point of the project: not just classification, but classification with enough context to mean something.

And if the task gets more fine-grained, like subtype prediction or ordinal differentiation grading, that dependence on context only gets stronger. The further you move from “is this malignant or not?” toward “what kind of malignant and how severe?”, the less a single magnification really feels sufficient.
