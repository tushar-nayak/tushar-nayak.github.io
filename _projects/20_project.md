---
layout: page
title: Federated Graph Learning for Pathology Images
description: A pathology learning pipeline that combines self-supervised image encoding, patient-level federated training, graph reasoning, and concept-bottleneck classification.
img: assets/img/oscc2.png
importance: 4
category: personal projects
github: https://github.com/tushar-nayak/glass-path
---

## project status: prototype

{% include project_links.liquid %}

GLASS Path is a graph-based learning architecture for spatial structures in pathology.

The project builds a unified federated pipeline for self-supervised image encoding, local graph reasoning, and concept-bottleneck classification. It treats patients as federated clients and supports smoke-test training on constrained hardware as well as fuller training runs.

Core pieces:

- Federated self-supervised pretraining
- Local graph reasoning over pathology image features
- Concept-bottleneck supervised classification
- Patient-level dataset splitting and low-resource smoke runs
