---
layout: post
title: "how i moved from biomedical engineering into robotic surgery research"
date: 2025-12-14 10:00:00
description: How image processing, pathology work, and medical AI gradually pulled me toward robotics.
tags: robotics biomedical-engineering medical-imaging research journey
categories: research
featured_project: 1_project.md
---

I did not start out thinking, “yes, clearly the destination is image-guided robotic surgery.”

It was much more gradual than that. The through-line only looks obvious in hindsight.

## It started with images, not robots

A lot of my earlier work was on image-based biomedical problems: pathology images, blood smears, skin lesion classification, things in that orbit. That gave me a pretty direct introduction to what medical AI looks like when you are not working on toy data.

You learn about stain variation. Dataset bias. Explainability pressure. Why clinicians care about false confidence for very good reasons. It was a useful technical foundation, but it also changed the kinds of questions I found interesting.

## Then geometry started to matter more

At some point I realized I was less interested in static image classification by itself and more interested in structure, shape, and spatial reasoning.

That naturally pulled me toward 3D vision and medical imaging problems where the answer is not just a label. It is a surface, a volume, a pose, a registration, or a deformation field. Once you start caring about that kind of output, robotics is not that far away.

## Robotics made the errors feel more real

The jump into robotic surgery research happened because the vision problem stopped being purely observational. In robotics, the geometry is not just there to be analyzed. It gets used.

If the reconstruction is wrong, the planning can be wrong. If the registration drifts, the guidance overlay drifts. If the anatomy deforms and the model pretends otherwise, the whole setup starts lying in a very confident way. That made the work feel both harder and more worth doing.

## Biomedical engineering was still the right way in

I do not think I moved away from biomedical engineering so much as I carried the useful parts of it with me.

The medical context, the habit of caring about workflow constraints, and the instinct to ask whether a model would still be useful once it leaves the benchmark table all came from that background. Robotics just gave those instincts a new place to matter.

## What changed at CMU

Doing my master’s work in a robotics-heavy environment made the shift feel more complete. The questions got more geometric, more systems-oriented, and more tied to deployment realities.

Now I spend a lot more time thinking about sparse clinical data, deformation, registration, reconstruction, and models that have to stay honest under physical change. That is not a random detour from biomedical engineering. To me it feels like a sharper version of the same interest.

## Why I am happy with that path

Looking back, the move makes sense. I started with medical image understanding, then got pulled toward geometry, then toward systems that have to act on geometry in real clinical conditions.

That is basically how I ended up here: still doing biomedical engineering in spirit, just with more robots, more 3D vision, and much less patience for neat assumptions.
