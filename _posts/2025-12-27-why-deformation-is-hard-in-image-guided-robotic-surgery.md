---
layout: post
title: why deformation is the hard problem in image-guided robotic surgery
date: 2025-12-27 10:00:00
description: Why anatomy that moves, stretches, and bends turns guidance into a much harder vision problem than it first appears.
tags: surgical robotics medical-imaging deformation registration
categories: research
---

Most image-guided robotic surgery pipelines quietly depend on one assumption: the anatomy seen before the procedure is close enough to the anatomy during the procedure. That assumption is often false.

Pre-operative scans are usually high quality. They give clean 3D structure, vessel geometry, organ boundaries, tumor context, and a roadmap for planning. Intra-operative imaging is a different world. It is sparse, noisy, low contrast, projection-based, and often only partially informative. The central difficulty is not just that the intra-operative image is worse. It is that the body itself has changed shape.

That is the deformation problem.

## A rigid world would be much easier

If anatomy behaved like a rigid object, image guidance would be a much cleaner engineering problem. You could take a pre-operative model, estimate a pose, align it to the live image, and trust that the geometry still meant the same thing. Registration would mostly be about translation, rotation, and scale.

But tissue is not rigid. Blood vessels bend when tools advance through them. Organs shift with respiration. Soft tissue compresses under contact. Retraction changes local geometry. Even patient positioning can alter the anatomy enough to matter. Once that happens, a rigid transform is no longer a faithful description of reality.

The robot may still know where its tool is in image coordinates, but that does not mean it knows where the anatomy truly is.

## Why deformation breaks guidance

Image-guided robotic surgery relies on correspondences. A point in the pre-op scan is assumed to match a point in the operating room. A centerline in a CT angiogram is assumed to represent the vessel path seen under fluoroscopy. A planned trajectory is assumed to remain valid after intervention begins.

Deformation breaks all three.

When anatomy deforms, the map is no longer static. The system is trying to relate:

- a detailed pre-operative 3D volume
- a limited intra-operative observation
- a live tool interacting with tissue
- a body that is changing state over time

That turns registration from a geometry problem into a geometry-plus-physics problem.

## The hardest part is that the evidence is incomplete

In many surgical settings, especially minimally invasive ones, you do not observe the full deformation directly. You only see indirect clues.

A fluoroscopy frame gives a 2D projection of a 3D scene. Endoscopic video gives surface appearance, not full volumetric motion. Ultrasound may be local, noisy, and operator-dependent. Sometimes the tool is easier to see than the tissue it is deforming.

So the real task is not just measuring deformation. It is inferring hidden 3D motion from partial, imperfect observations.

That makes the problem ill-posed. Many different 3D deformations can produce very similar 2D images. Without stronger priors, temporal constraints, anatomy models, or physics, the solution is underdetermined.

## Why better segmentation or detection alone is not enough

A common instinct in medical vision is to ask for a better detector, a better segmenter, or a better backbone. Those matter, but they do not solve the core issue by themselves.

You can segment a vessel or an organ very accurately in a single frame and still fail clinically if the inferred geometry is wrong over time. The challenge is not only recognizing anatomy. It is maintaining anatomical truth while the scene evolves.

This is why deformation is harder than standard perception. The system has to recover structure, motion, and mechanical plausibility at the same time.

## Registration becomes a moving target

Classical registration assumes that the source and target describe the same underlying object state. In surgery, that assumption can collapse the moment a device touches tissue.

Now the system must answer harder questions:

- Which part of the anatomy moved because of respiration?
- Which part moved because of tool interaction?
- Which changes are global and which are local?
- Which deformations are physically plausible and which are artifacts from the image?

This is where many pipelines become brittle. They may work when anatomy is static or nearly static, but drift when local interactions accumulate. The failure is often subtle. The overlay still looks reasonable, but millimeters matter in surgery.

## Why this matters so much in robotics

Robotic systems increase precision, but that also means they expose the cost of geometric error more sharply. If the robot acts on a misregistered model, precision does not rescue the system. It can make the wrong action more exact.

That is why deformation is not a cosmetic modeling detail. It sits directly on the path between perception and action.

For robotic guidance to be trustworthy, the system needs a live estimate of anatomy that reflects how the tissue actually moves and bends under intervention. That usually means combining image evidence with priors about anatomy, temporal continuity, and mechanics.

## Why I care about this problem

This is the reason I am spending my master's thesis working on deformation in image-guided robotic intervention.

I am interested in the point where computer vision stops being just pattern recognition and starts becoming a decision-critical model of the physical world. In surgery, that boundary is very real. A pre-operative scan is useful, but only if we can relate it to what the surgeon or robot is actually facing in the moment.

What draws me to this problem is that it demands more than a good image model. It requires geometric reasoning, uncertainty awareness, and respect for the physics of tissue-tool interaction. That combination is hard, but it is also where I think some of the most meaningful progress in surgical robotics can happen.

If image-guided robotics is going to become more reliable, more autonomous, and more clinically useful, then handling deformation is not optional. It is the hard problem.
