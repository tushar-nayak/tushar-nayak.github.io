---
layout: post
title: "what makes a research prototype different from a deployable clinical tool"
date: 2026-05-15 10:00:00
description: Why a promising model still has a long way to go before it becomes something clinicians can rely on.
tags: clinical-ai medical-imaging deployment research-prototypes biomedical-ai
categories: research
---

A research prototype is allowed to be fragile in ways a clinical tool is not.

That is not an insult to prototypes. Prototypes are where ideas become real enough to test. But there is a large gap between “this method works on our dataset” and “this tool can be used in a clinical workflow without making everyone nervous.”

That gap is where a lot of biomedical AI work gets interesting.

## A prototype proves an idea

A research prototype usually asks whether a concept is possible.

Can we segment the structure? Can we reconstruct the anatomy from sparse views? Can we denoise the image without destroying edges? Can we track the tool? Can we improve the metric over a baseline?

Those are legitimate questions. The prototype should answer them quickly and clearly.

But a prototype is often built under controlled conditions. The dataset is curated. The pipeline may need manual steps. Failure cases may be inspected by the researcher but not handled by the system. The model may work well when everything is arranged correctly.

That is fine for research. It is not enough for deployment.

## A clinical tool has to survive the workflow

A deployable tool has to live inside a real workflow.

It has to handle messy inputs, missing data, strange cases, scanner differences, timing constraints, user interaction, error states, and uncertainty. It has to fail safely. It has to explain enough for a person to know when not to trust it.

In surgical or navigation-heavy settings, the output also needs to be geometrically useful. A segmentation mask is not enough if the system needs a surface. A reconstruction is not enough if it cannot register. A tool detection is not enough if the active tip is unstable.

The output has to fit the next step.

## Robustness matters more than peak performance

Research papers often reward the best average metric. Clinical tools care a lot about the tail.

What happens on the worst cases? What happens when the scan quality drops? What happens when anatomy is unusual? What happens when the model is uncertain? What happens when preprocessing fails? Does the system know it failed, or does it keep producing confident nonsense?

A slightly lower average score with better failure awareness may be more useful than a higher score that fails silently.

## Where prototypes usually stop too early

The common failure is building a model and calling it a tool.

A notebook that produces good results is not a tool. A script that only runs on one folder structure is not a tool. A model that needs manual case cleanup is not a tool. A segmentation that cannot produce a usable downstream artifact is not a tool.

These things can become tools, but only after the system work happens.

## The kinds of projects that exposed this gap

A lot of my projects have lived in the space between prototype and pipeline.

The lung CT work became more useful when it connected preprocessing, segmentation, evaluation, and mesh export. The reconstruction work became more interesting when the output was judged as geometry, not just as a loss value. The pathology work became more trustworthy when evaluation looked at leakage, context, and explanations.

In each case, the model was only one part of the story.

## The line between interesting and usable

The difference between a research prototype and a deployable clinical tool is not just polish. It is responsibility.

A prototype can say, “here is evidence that the idea works.” A clinical tool has to say, “here is how the system behaves when the world is inconvenient.”

Those are very different promises.

## What I would demand before calling something deployable

For any project moving toward clinical usefulness, I would add four things early: uncertainty or failure detection, external or shifted evaluation, case-wise inspection, and a clean output artifact that matches the workflow.

That does not make the system deployable by itself. But it moves the project away from demo logic and toward tool logic.

That is the direction that matters.
