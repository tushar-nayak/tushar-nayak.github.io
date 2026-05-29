---
layout: post
title: "five open problems i care about in image-guided robotic intervention"
date: 2026-05-19 10:00:00
description: Five technical problems that keep pulling me back toward surgical perception and geometry.
tags: robotic-surgery surgical-vision image-guidance open-problems geometry
categories: research
featured: true
featured_project: 1_project.md
---

Image-guided robotic intervention is interesting because the hardest problems do not sit neatly inside one field.

They are part computer vision, part medical imaging, part robotics, part geometry, and part clinical workflow. That is exactly why I keep coming back to them.

Here are five open problems I care about most.

## 1. Deformation-aware registration

Preoperative images are detailed, but they are not always current. Once the procedure starts, anatomy can move, bend, compress, or shift.

Rigid registration is useful, but it cannot explain everything. The harder problem is estimating deformation from sparse intraoperative evidence without inventing impossible anatomy.

That is especially important in endovascular settings, where the guidewire or catheter can change vessel geometry while the live imaging is still a 2D projection.

## 2. Sparse-view 3d reconstruction that knows what it does not know

Clinical imaging often gives you limited views because that is what the workflow allows. Sparse fluoroscopy, limited ultrasound, or a few standard echo views are not artificial benchmark constraints. They are the real setup.

The open problem is not only reconstructing a plausible 3D object. It is knowing where the reconstruction is actually constrained by evidence and where the model is relying mostly on a prior.

That uncertainty matters. A confident reconstruction in an unobserved region is not automatically useful. Sometimes it is dangerous.

## 3. Geometry that survives downstream use

A lot of medical AI outputs look fine until they are converted into the thing a downstream workflow needs.

Masks become meshes. Meshes become registration inputs. Centerlines become navigation paths. Reconstructions become overlays. Every conversion can expose errors that the original metric missed.

So one open problem is building models whose outputs are not only accurate under a benchmark, but stable as usable geometry.

## 4. Tool-tissue interaction understanding

Surgical tools are not just objects in the frame. They are causes of change.

A tool pushes tissue, occludes anatomy, bends vessels, creates deformation, and changes what the image means. Most vision systems still treat tools mainly as things to detect or segment. That is useful, but incomplete.

The harder problem is understanding interaction: what the tool is doing to the anatomy and how that should update the model of the scene.

## 5. Evaluation that matches clinical usefulness

This might be the least flashy problem, but it is one of the most important.

A metric can improve while the system stays clinically awkward. Dice can miss surface problems. Reprojection error can hide bad 3D geometry. Rendering quality can hide unstable anatomy. Detection accuracy can ignore tip precision.

Image-guided intervention needs evaluation that asks whether the output supports the task. That means geometry-aware metrics, temporal stability, uncertainty, failure-case analysis, and workflow-level checks.

## Why these problems connect

All five problems are really versions of the same question: how do you keep a model honest when the image is incomplete and the anatomy is changing?

That is the technical thread I care about. Not just perception as recognition, but perception as maintaining a useful representation of the surgical world under pressure.

## Where I would start if I had to pick one

The projects I want to build around these problems would combine sparse imaging, deformable geometry, physically informed constraints, and downstream evaluation.

Not because those words sound good together, but because the clinical setting forces them together. The image is partial. The anatomy is physical. The robot needs geometry. The system has to act before everything is perfectly observed.

That is the part that makes the work hard. It is also the part that makes it worth doing.
