---
layout: post
title: "how teaching courses changed how i think about machine learning systems"
date: 2026-05-26 10:00:00
description: Why teaching deep learning made me care more about clarity, failure modes, and the parts of ML people usually skip.
tags: teaching machine-learning deep-learning systems research
categories: research
---

Teaching did not make machine learning feel simpler. It made it harder to bluff my way through the blurry parts. That turned out to be useful.

A lot of research writing lets you stay one level above the mess. A lecture room does not. If a step is hand-wavy, students hit it immediately. If a metric is misleading, somebody asks why. If the split is wrong, somebody eventually notices. That pressure makes you explain the system, not just the headline idea.

Teaching machine learning changed the way I think about machine learning.

## Students expose the hidden assumptions

When you work on a project alone, you can skip over details because your brain fills them in.

When you teach, those skipped details come back immediately. Why does the loss behave that way? Why does the model overfit? Why does normalization matter? Why does the validation split need to be patient-wise? Why does a high metric not always mean the model is good?

Those questions are not beginner questions in a dismissive sense. They are the questions that reveal whether the system actually makes sense.

## Model design became less mystical

Teaching made model design feel less like architecture shopping and more like constraint matching.

What information does the model need? What inductive bias helps? What failure mode are we trying to prevent? Is the task local or global? Does it need memory, geometry, scale, or uncertainty? Is the data large enough for the model we want?

Those are the questions I wish every project started with.

## Debugging became a communication problem

A lot of ML debugging is really about making the failure visible.

Students often struggle because the failure is hidden inside a training curve, a bad split, a silent preprocessing bug, or a metric that does not mean what they think it means. Helping them debug made me more systematic in my own work.

Look at the data. Look at the labels. Look at the predictions. Look at the worst cases. Check the split. Check the preprocessing. Check whether the model could be solving the task through a shortcut.

That sequence sounds basic because it is. It also works.

## What polished teaching gets wrong

The thing that fails in teaching is the overly polished explanation.

If you only show the clean version, students may understand the diagram but not the system. They need to see what happens when the learning rate is wrong, when the data is imbalanced, when augmentation breaks the label, when the metric lies, or when the model learns the shortcut.

Research papers often hide that mess. Teaching made me respect it more.

## The systems view teaching forced on me

Teaching made me care more about the path from idea to working system.

A model is not just layers. It is data, preprocessing, losses, optimization, evaluation, interpretation, and debugging. If students understand only the architecture, they do not really understand the system. The same is true for researchers.

## The assignment I think every ML class should have

If I were designing a machine learning course project, I would make failure analysis a required deliverable.

Not just final accuracy. Show the bad cases. Explain what the model learned. Compare the metric to the qualitative output. Identify one shortcut the model could be using. Describe one change that improved reliability rather than just the score.

That kind of assignment would teach the part of machine learning that actually stays with you.
