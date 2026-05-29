---
layout: post
title: "how to think about physics-informed learning without the hype"
date: 2026-04-29 10:00:00
description: Why physics-informed learning is useful when it constrains the right thing, and annoying when it becomes branding.
tags: physics-informed-learning pinns medical-imaging geometry surgical-robotics
categories: research
featured_project: 1_project.md
---

Physics-informed learning is one of those phrases that can mean something very useful or almost nothing, depending on how it is used.

At its best, it gives the model a reason not to make physically ridiculous predictions. At its worst, it is a regular neural network with a physics word added to the abstract.

I think the useful version is much more practical than mystical. It is about choosing which constraints matter, where they should enter the pipeline, and how much authority they should have over the data.

## The point is not to worship the equation

The point of physics-informed learning is not that every problem becomes better the moment you add a differential equation.

The point is that some problems are underconstrained by the observations alone. If the image does not fully determine the geometry, motion, deformation, or flow, then the model needs some additional structure. Physics is one possible source of that structure.

In medical imaging and surgical robotics, that comes up constantly. Fluoroscopy collapses 3D anatomy into 2D. Sparse ultrasound views miss large parts of the target. Endoscopy sees surface appearance but not internal structure. Deformable anatomy changes while you are observing it. In these settings, the image is usually not enough.

## Physics is a constraint, not a guarantee

The dangerous mistake is treating physics-informed learning as automatically more correct.

A physics loss can be wrong. The assumptions can be wrong. The boundary conditions can be too simplified. The weights can be badly tuned. The data term can fight the physics term. The equation can describe an idealized system that does not match the actual clinical setup.

So the question is not “did we add physics?” The question is “did the added constraint reduce the right kind of error?”

That is a much stricter standard.

## Where it helps

Physics-informed learning is most useful when the failure mode is physically implausible but numerically tempting.

In deformable vessel reconstruction, for example, a model might explain a 2D projection with a 3D shape that bends too sharply, stretches unrealistically, or violates anatomical continuity. A purely image-space loss may not care because the projection still looks fine. A physical or geometric regularizer can push the solution back toward something a real vessel could plausibly do.

The same idea shows up in denoising with PDEs. Anisotropic diffusion is useful because it encodes a real preference: smooth homogeneous regions, protect edges. The neural version helps because it keeps the useful inductive bias while learning where the hand-written rule is too rigid.

## Where it gets annoying

The hype version usually fails in one of three ways.

The first failure is decorative physics. The paper adds a small residual loss that barely affects training, but the method is marketed as physics-informed anyway.

The second failure is overpowering physics. The constraint is so strong that the model becomes loyal to the simplified equation and ignores patient-specific evidence.

The third failure is unmeasured physics. The authors claim physical plausibility but only report standard vision metrics, so you never actually find out whether the constraint helped.

That last one bothers me the most. If a method claims physics-informed behavior, the evaluation should include something that tests that behavior.

## The kind of setup where this gets real

In my own work, the most useful constraints have usually been boring geometric ones: smooth centerlines, limited curvature, stable spacing between control points, radius consistency, projection-aware losses, and shape priors that stop sparse 2D evidence from becoming arbitrary 3D deformation.

Those are not glamorous. But they are often exactly what the model needs.

The lesson for me was that the constraint should match the failure mode. If the vessel is becoming locally jagged, add a curvature penalty. If the radius jumps unrealistically, regularize radius smoothness. If the 3D deformation projects correctly but violates anatomy, add a geometry-space check. Do not add physics because it sounds impressive. Add it because you can point to the thing it is preventing.

## Where the nice story falls apart

The hard part is weighting. A physics term that is too weak becomes ceremonial. A term that is too strong makes the model stubborn. A projection loss can dominate the geometry. A smoothness loss can erase real local deformation.

That is the annoying but important part. Physics-informed learning is not a free lunch. It is a negotiation between measurements, priors, and assumptions.

## The explainer version

The useful way to think about physics-informed learning is not as a separate category of AI. It is a design habit.

Ask what the data cannot see. Ask what solutions are physically impossible but mathematically convenient. Ask what constraint would remove those solutions without crushing the real variation you care about.

That is the version of physics-informed learning I trust.

## What I would push on next

I would like to see more physics-informed work evaluated by failure modes, not just average metrics. Show when the constraint helps, when it hurts, and what happens when the physical assumptions are violated.

That would make the field less hype-driven and much more useful.
