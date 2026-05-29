---
layout: post
title: "what makes surgical computer vision different from standard vision benchmarks"
date: 2026-04-27 10:00:00
description: Why surgical vision is not just object detection with more expensive images.
tags: surgical-vision computer-vision medical-imaging robotics benchmarks
categories: research
featured_project: 13_project.md
---

Surgical computer vision looks like regular computer vision right up until you ask what the output is supposed to do. Then the differences stop looking cosmetic and start looking structural.

That is the version of the topic I want this post to explain. Not in a "medical images are harder" way, because that is true but not very useful. The more interesting point is that surgery changes the job description of the model. The image is tied to action, the scene keeps changing, and the failure cases are downstream rather than decorative.

There are images, tools, anatomy, labels, masks, camera poses, and all the usual model choices. So it is tempting to treat the problem as a more specialized version of normal vision.

I do not think that is quite right.

Surgery changes the meaning of the image. The frame is not just something to understand. It is part of a live intervention where errors have physical consequences, time matters, and the scene is actively changing because of the procedure itself.

## The image is only one part of the system

In standard vision benchmarks, the image is usually treated as the main object. You get a frame or a set of frames, the model predicts something, and the score tells you how well it did.

In surgery, the image is evidence inside a larger system. The surgeon is moving. The tool is moving. The tissue is moving. The camera may be moving. The lighting changes. Fluids appear. Smoke appears. Anatomy disappears behind tools. The visual input is not a clean snapshot of the world. It is a partial signal from a dynamic physical process.

That changes what the model has to be good at. It is not enough to recognize what is visible. A useful system has to understand what the visible part implies about the hidden part, what might have changed since the preoperative plan, and whether its own output is still trustworthy.

## The benchmark assumptions break very quickly

A lot of computer vision benchmarks quietly assume that the scene is reasonably observable. The object is in the image. The label is well-defined. The annotation is the thing you want. The output can be evaluated independently of what happens next.

Surgical vision is less polite.

Anatomy can be partly occluded. Tissue can deform. Labels can be ambiguous because the boundary is not visually obvious. The clinically important structure may not be the most visually salient one. A tool can hide exactly the region that matters. A small error near a vessel or nerve can be much more important than a larger error somewhere irrelevant.

So the task is not just harder because the data is messier. It is harder because the usual notion of “correct” becomes more dependent on context.

## Real-time constraints are not cosmetic

Another big difference is that surgical vision often wants to be useful while the procedure is happening. That means latency is not just an engineering afterthought. It changes the method you can reasonably use.

A model that takes minutes to refine a beautiful reconstruction may be interesting scientifically, but it is not giving guidance in the loop. A slightly uglier model that runs fast, exposes uncertainty, and fails in predictable ways may be much more useful.

This is where surgical vision starts to feel closer to robotics than to offline image analysis. The question is not only “can the model understand the scene?” It is “can it understand enough, quickly enough, to support the next action?”

## The outputs have to be usable

Standard vision tasks often end at a mask, a bounding box, a class label, or a depth map. Surgical workflows usually need those outputs to become something else.

A segmentation may need to become a mesh. A tool detection may need to become a pose. A reconstruction may need to become a registered geometry that lines up with preoperative data. A tracking result may need to stay stable over time, not just look good frame by frame.

That is why evaluation has to move beyond screenshot-level success. A mask that looks fine in isolation can become useless if it produces a broken surface. A pose estimate can be visually close but unstable enough to make guidance jitter. A reconstruction can have low reprojection error and still be anatomically wrong.

## The trap people fall into

The biggest mistake is treating surgical vision like a normal benchmark with medical labels attached.

That framing makes you optimize the obvious thing: better segmentation, better detection, cleaner overlays. Those are useful, but they are not the full problem. The more interesting failure happens when the model is locally correct and globally unhelpful.

For example, a tool detector can work well but tell you nothing about how the vessel changed because of the tool. A segmentation can identify the visible anatomy but ignore the fact that the hidden anatomy has shifted. A reconstruction can look plausible but not be stable enough for registration.

That is the failure mode I care about most: the model looks like it is solving the task, but it is not solving the workflow.

## The more useful way to frame it

Surgical computer vision is different because the image is tied to action. The model is not just describing a scene. It is trying to maintain a useful representation of anatomy under partial observation, deformation, occlusion, and time pressure.

That makes the best problems more geometric, more physical, and more systems-oriented than they first appear.

## If I were designing the benchmark myself

If I were building a surgical vision benchmark from scratch, I would not only ask for per-frame accuracy. I would ask whether the method stays temporally stable, whether it preserves clinically meaningful geometry, whether it can detect when it is uncertain, and whether the output can actually enter a navigation or robotic pipeline.

That would make the benchmark less clean. It would also make it more honest.
