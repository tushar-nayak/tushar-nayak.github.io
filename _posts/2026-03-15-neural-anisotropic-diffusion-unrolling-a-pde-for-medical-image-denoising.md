---
layout: post
title: neural anisotropic diffusion: unrolling a pde for medical image denoising
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

The classical idea is pretty intuitive: smooth flat regions, but slow down when you hit an edge. That’s a lot better than just blurring the whole image, because medical images are full of places where a little smoothing helps and a little too much smoothing is a problem. The catch is that the hand-written PDE can get confused when the noise is strong.

The neural version tries to fix that without throwing the original idea away.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nad_qualitative_results.png" title="Denoising results showing noisy input and restored output" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The useful part of denoising is not making everything smoother. It is keeping the structure that still matters after the noise is gone.
</div>

## Why denoising is awkward in medical images

Instead of using a fixed diffusion rule, the project unrolls the PDE into a learnable network. Each diffusion step becomes part of a differentiable model, so the network can learn where to smooth and where to leave things alone. I like that it still feels like the same PDE, just with a bit more flexibility.

## The idea behind anisotropic diffusion

What the model is really learning is restraint. In flat tissue, it should smooth enough to knock out noise. Near a boundary, it should ease off. That balance is the whole trick. If you protect every gradient, you keep too much noise. If you smooth too hard, you lose the anatomy. The learned conduction field sits in the middle, which is the useful part.

## Why the neural version helps

The other nice piece is context. In a brain MRI, the same local pattern can mean different things depending on where it appears. A guidance encoder helps the model see the larger picture instead of just reacting to tiny neighborhoods. That’s what makes it work better than a filter that only looks at nearby pixels.

## Why I still like this kind of work

For me, this project is a good example of the kind of work I like: keep the core scientific idea, make it learnable, and use it on real medical data without pretending the problem is simpler than it is.
