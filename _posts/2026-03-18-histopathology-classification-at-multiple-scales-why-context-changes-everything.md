---
layout: post
title: histopathology classification at multiple scales: why context changes everything
date: 2026-03-18 10:00:00
description: Why looking at pathology at more than one magnification can change the answer entirely.
tags: pathology histopathology multi-scale classification deep-learning
categories: research
---

Pathology is one of those places where the answer changes depending on how far in you zoom.

At low magnification, you see the bigger layout of the tissue. At high magnification, you start seeing the cellular details that separate one class from another. If you only use one view, you are basically asking the model to guess with part of the story missing.

That’s why multi-scale histopathology matters.

A patch can look pretty normal at one zoom level and look very different at another. The reverse happens too. Something that looks suspicious up close can make more sense once you zoom out and see how it fits into the whole slide. That’s what makes pathology different from a lot of standard image classification problems. The model is not just reading texture. It is reading context.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_thumbnails/lobe-ranger.png" title="Multi-scale histopathology model preview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The point of multi-scale pathology is pretty simple: zoom out for structure, zoom in for detail, then let both views argue with each other a bit.
</div>

If you only give it a tiny crop, it can miss the larger pattern. If you only give it the full slide at low resolution, it can miss the fine details that actually matter. So the useful middle ground is to keep both. That’s why this project uses 20x and 40x views together instead of forcing one magnification to do all the work.

The setup is simple enough to explain in one sentence: extract features from both scales, let them interact, and then make the prediction from the combined representation. The shared ViT backbone handles the feature extraction, and cross-scale attention helps the model figure out what matters more in each region. Sometimes the 20x view gives you the overall structure, and the 40x view explains the weird-looking part inside it.

What I like about this problem is that it feels closer to how a person would actually look at a slide. You zoom out first to get the layout, then zoom in to check the details, and then you use both before making a call. That’s basically the whole point of the project: not just classification, but classification with enough context to mean something.
