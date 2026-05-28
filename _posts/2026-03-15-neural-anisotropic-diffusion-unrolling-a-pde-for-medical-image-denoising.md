---
layout: post
title: "neural anisotropic diffusion: unrolling a pde for medical image denoising"
date: 2026-03-15 10:00:00
last_updated: 2026-05-27 10:00:00
description: How an edge-aware PDE can be turned into a neural network that removes noise without destroying the anatomy that matters.
tags: medical-imaging pdes denoising deep-learning
categories: research
featured: true
---

Medical image denoising sounds simple until you actually care about the anatomy.

A noisy MRI slice is not just annoying to look at. It can hide a boundary, blur a subtle texture, or make a downstream model less reliable. So the goal is not to make the image look cleaner in a cosmetic sense. The goal is to clean it up without messing with the bits that matter.

## Why denoising gets awkward fast

That is where anisotropic diffusion starts to make sense.

The classical idea is pretty intuitive: smooth flat regions, but slow down when you hit an edge. That is a lot better than blurring the whole image, because medical images are full of places where a little smoothing helps and a little too much smoothing is a problem. The catch is that the hand-written PDE can get confused when the noise is strong.

The neural version tries to keep the original idea and make it less brittle.

At the PDE level, the update is basically saying: diffuse according to a conductivity term that depends on local structure. If the neighborhood looks flat, diffuse more. If the gradient starts looking like an edge, diffuse less. The problem is that a hand-designed conductivity function cannot always tell the difference between true anatomy and ugly noise, especially when the image quality is already bad.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_qualitative_results.png" title="Denoising results showing noisy input and restored output" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The useful part of denoising is not making everything smoother. It is keeping the structure that still matters after the noise is gone.
</div>

## Why denoising is awkward in medical images

Instead of using a fixed diffusion rule, the project unrolls the PDE into a learnable network. Each diffusion step becomes part of a differentiable model, so the network can learn where to smooth and where to leave things alone. It still feels like the same PDE, just with a bit more flexibility.

That unrolling part is what makes the whole thing interesting to me. You are not discarding the old model and replacing it with a giant black box. You are taking an iterative solver and turning each iteration into a learnable block. The depth of the network now roughly corresponds to the number of diffusion steps, and the learned parameters tell you how the diffusion should behave rather than whether diffusion should exist at all.

There is also a practical upside. Classical diffusion can need careful parameter tuning for step size, stopping time, and edge sensitivity. Once the process is unrolled, some of that tuning gets absorbed into training, which makes the model easier to adapt to a specific imaging setting.

## The idea behind anisotropic diffusion

What the model is really learning is restraint. In flat tissue, it should smooth enough to knock out noise. Near a boundary, it should ease off. That balance is the whole trick. If you protect every gradient, you keep too much noise. If you smooth too hard, you lose the anatomy. The learned conduction field sits in the middle, which is the useful part.

That sounds simple until you remember that medical edges are not all strong crisp boundaries. Some of the structures you care about are faint. Some are partial-volume effects. Some look weak because of acquisition settings rather than biology. So the model is not just learning edge-preserving smoothing in a textbook sense. It is learning which weak structures are worth keeping and which weak structures are just junk.

## Why the neural version helps

The other nice piece is context. In a brain MRI, the same local pattern can mean different things depending on where it appears. A guidance encoder helps the model see the larger picture instead of just reacting to tiny neighborhoods. That is what makes it work better than a filter that only looks at nearby pixels.

This is where the neural version stops behaving like a fancy filter and starts behaving like an imaging model. A local patch by itself can be ambiguous. Noise, vessel boundaries, small lesions, and texture can all produce gradients. Context lets the network say, “this looks like a meaningful boundary in this region” or “this is probably just noise amplification.” That extra bit of judgment is exactly what classical diffusion is missing.

There is also a stability question here. If you unroll too aggressively and let every step do whatever it wants, the model stops looking like diffusion and starts acting like a generic denoiser with a PDE costume on. So the useful version is the one that stays structured enough to inherit the good inductive bias, while still learning where the original hand-crafted rule falls short.

## Why I still like this kind of work

For me, this project is a good example of the kind of work I like: keep the core scientific idea, make it learnable, and use it on real medical data without pretending the problem is simpler than it is.

It also says something broader about medical imaging models. I do not think every problem needs to start from scratch with a huge architecture. Sometimes the better move is to take an old idea that already knows something about the physics or the geometry of the problem and give it just enough learning capacity to stop being rigid.
