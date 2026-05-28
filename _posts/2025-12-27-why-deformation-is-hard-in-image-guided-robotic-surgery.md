---
layout: post
title: why deformation is the hard problem in image-guided robotic surgery
date: 2025-12-27 10:00:00
description: Why anatomy that moves, stretches, and bends turns guidance into a much harder vision problem than it first appears.
tags: surgical robotics medical-imaging deformation registration
categories: research
featured: true
---

Image-guided robotic surgery only works if the model of the body still makes sense once the procedure starts. That is where things get messy fast.

Pre-op scans are clean, detailed, and nicely 3D. Intra-op images usually are not. They are sparse, noisy, low contrast, and only give you part of the story. But the bigger issue is not the image quality itself. It is that the anatomy is moving while you are trying to read it.

## Why deformation is such a pain

That’s why deformation is such a hard problem.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/newplotx.png" title="Synthetic vessel deformation and fluoroscopy-style projection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A simple example of the problem: the 3D anatomy changes shape, while the image you get is still just a projection.
</div>

## A rigid world would be easier

If tissue were rigid, this would be way easier. You would estimate a pose, line things up, and call it a day. But vessels bend when tools move through them. Organs shift with breathing. Soft tissue compresses. Even patient positioning can nudge the geometry enough to matter. At that point, a rigid transform just stops being honest.

## Why deformation breaks the whole setup

The annoying part is that the system still wants correspondences. It wants to match a point in CT to a point in fluoroscopy, or a vessel centerline in the scan to what the surgeon is seeing live. Once the anatomy deforms, those matches become slippery. Registration turns into a geometry-and-physics problem instead of just geometry.

The evidence is also incomplete, which does not help. Fluoroscopy gives you a 2D projection of a 3D scene. Endoscopy shows the surface, not the full volume. Ultrasound is local and noisy. Sometimes the tool is easier to see than the tissue it is changing. So the system is not really seeing deformation directly. It is piecing it together from hints.

## Why this is not just another vision problem

That’s also why this is harder than segmentation or detection. You can segment an organ perfectly in one frame and still be wrong a moment later if that structure has moved. In surgery, the question is not just “what is this?” It is also “what does it become next?”

This matters because robotics makes small errors expensive. A misregistered model does not just give a slightly off overlay. It can make a very precise robot act on the wrong geometry with confidence, which is exactly the kind of failure you do not want in the operating room.

## Why I keep coming back to it

I keep coming back to this problem because it sits right at the boundary between vision and physical reality. My master’s thesis is focused on that boundary: building models that do not just recognize anatomy, but stay honest when the anatomy bends, shifts, and refuses to stay still. That is what makes the problem worth working on, and also why it is so hard.
