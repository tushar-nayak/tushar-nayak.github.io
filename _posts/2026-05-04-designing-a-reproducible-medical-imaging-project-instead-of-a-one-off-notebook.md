---
layout: post
title: "designing a reproducible medical imaging project instead of a one-off notebook"
date: 2026-05-04 10:00:00
description: Why medical imaging projects become more valuable when the pipeline can be rerun without guesswork.
tags: medical-imaging reproducibility pipelines monai simpleitk research
categories: research
featured_project: 12_project.md
---

A one-off notebook can be a good place to start. It is fast, flexible, and forgiving. But it is a bad place for a medical imaging project to live forever.

The moment the project becomes serious, you need to know whether the result can be reproduced without remembering which cell you ran, which path you edited, or which preprocessing step you quietly changed at 2 a.m.

That is where the project stops being a notebook and starts becoming a pipeline.

## Medical imaging has too many silent assumptions

The difficult part is that medical images carry more than pixels.

They carry spacing, orientation, origin, modality-specific intensity conventions, patient or case identifiers, acquisition differences, and sometimes nested folder structures that are very good at breaking assumptions. If the code ignores those details, the model may still train, but the result is no longer trustworthy.

That is why I like forcing the project into explicit stages: dataset audit, preprocessing, training, inference, evaluation, visualization, and export. Each stage should leave artifacts behind so you can inspect what happened.

## The boring files matter

A reproducible project needs more than `train.py`.

It needs a clear directory structure, a config file, a requirements file, a dataset manifest, logged metrics, saved checkpoints, and predictable output folders. It needs scripts that do one thing well instead of a giant notebook that depends on hidden state.

This sounds boring until something breaks. Then the boring files become the only reason you can recover.

If a run performs better, you should know which preprocessing, split, hyperparameters, and checkpoint produced it. If a run performs worse, you should be able to compare it without guessing.

## What a real project needs besides a model

In the lung CT and reconstruction-style projects, the useful pattern was to make the pipeline leave evidence.

Preprocessing saves transformed volumes. Training saves metrics and checkpoints. Inference saves masks. Surface export saves meshes. Evaluation saves case-wise scores. Visualization saves enough images or geometry that the numbers are not the only thing you trust.

That makes the project feel heavier at first, but it changes the kind of debugging you can do. Instead of asking “why is the model bad?” you can ask where the pipeline went wrong.

Did the crop miss anatomy? Did resampling distort the structure? Did the split leak? Did the model fail on specific cases? Did the mesh export reveal a geometry problem that the Dice score hid?

Those are much better questions.

## Where notebook-first projects quietly break

The main failure mode of one-off notebooks is that they make progress feel faster than it really is.

You get a model running quickly, but the project becomes hard to extend. Adding a new dataset is painful. Changing preprocessing is risky. Comparing two runs is messy. Exporting outputs for another tool becomes a manual chore. And eventually you stop knowing which result is the “real” one.

The other failure is that notebooks make it easy to hide unsuccessful choices. In a reproducible project, failed runs are still useful because they are recorded. In a notebook, they often disappear.

## The habit that matters most

Reproducibility is not only about making someone else happy. It makes your own work better.

A clean pipeline forces you to separate ideas from accidents. If the method improves, you can show where. If it fails, you can find why. If you return to the project after a month, you do not have to reconstruct your own brain state from scattered cells.

That matters a lot in medical imaging because small preprocessing choices can change the meaning of the data.

## What I would standardize from day one

For future projects, I would make the first commit boring on purpose: dataset audit, config loading, logging, path management, and a tiny end-to-end smoke test.

Then I would add the model.

That order feels slower, but it usually saves time. A reproducible project is not just cleaner. It is easier to trust.
