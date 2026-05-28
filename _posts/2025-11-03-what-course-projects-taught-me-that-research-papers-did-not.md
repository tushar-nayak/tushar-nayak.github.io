---
layout: post
title: "what course projects taught me that research papers did not"
date: 2025-11-03 10:00:00
description: A few things that only really sink in once you try to make the method run yourself.
tags: research course-projects 3d-vision medical-imaging learning
categories: research
featured_project: 4_project.md
---

Course projects are a good way to find out which parts of a paper you actually understood and which parts you just nodded at.

Reading papers is obviously useful. You get the framing, the intuition, the ablations, the result tables, the clean version of the method. But building something yourself forces a completely different level of honesty.

## The method diagram is the easy part

A paper diagram can make a pipeline look neat and inevitable. Then you try to implement it and realize half the real work lives in the boring edges.

Data conventions do not line up. Coordinate systems disagree with each other. Losses that look elegant on paper need careful weighting to stop one term from bulldozing the others. The “simple preprocessing” line in the methods section can hide an entire week of work.

## Optimization has a personality

One thing course projects taught me very quickly is that optimization is not just a detail you leave to the framework. Some models are stable, some are touchy, and some behave like they are personally offended by your learning rate.

That was especially obvious in 3D reconstruction work. The representation, initialization, supervision sparsity, and pose parameters all affect each other. A model can be technically correct and still impossible to train in a reliable way if the optimization path is bad.

## Evaluation feels different when the output is yours

When you read a paper, a metric is a number in a table. When you build the pipeline, that number suddenly has a face.

You start seeing what a “good” Dice can hide. You notice when a model gets the large easy region right and quietly messes up the edge cases. You learn that a better score and a more usable output are related, but not identical.

## Engineering choices are not side notes

Another thing I learned is that engineering choices are not beneath the research. They shape the research.

Whether you resample before cropping or after. Whether your augmentations preserve anatomy or distort it. Whether your validation split leaks patient identity. Whether your mesh export preserves topology well enough to inspect. These are not cosmetic decisions. They decide what kind of result you even get to claim.

## Reproducing is more educational than admiring

I think this is why course projects helped me so much. They forced me to stop treating methods like polished objects and start treating them like systems.

Once you have to wire the whole thing together yourself, the paper stops being a finished story and becomes a set of bets. Which assumptions matter? Which simplifications survive real data? Which ideas are strong enough to keep working once the setup gets less perfect?

## Why I still like doing them

Research papers teach you what is possible. Course projects teach you where the sharp edges are.

And honestly, I trust the second lesson a lot. Once you have watched a method almost work, fail for a dumb reason, recover after two structural fixes, and finally produce something real, you understand it in a way that reading alone does not quite give you.
