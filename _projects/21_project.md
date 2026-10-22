---
layout: page
title: "Patient-Specific Aortic Remodeling: Geometry, Growth & Hemodynamics"
description: Maps patient-specific aortic geometry, longitudinal growth, and available hemodynamic fields, then tests how their relationships hold across regions and mesh scales.
importance: 3
category: at the university of chicago
status: ongoing
tags: [Computational Biomechanics, Aortic Remodeling, Medical Imaging, Mesh Analysis]
featured: true
homepage_featured: true
homepage_order: 4
homepage_title: "Aortic Remodeling: Geometry, Growth & Flow"
---

## summary

At the University of Chicago's <a href="https://surgbiomech.uchicago.edu">Surgical Biomechanics Lab</a>, I develop patient-specific geometry and multiphysics analyses to study how aortic shape, tissue growth, and hemodynamic loading relate across the aortic wall. The work uses CAMP (Computational Anatomy Mapping and Processing) domains to compare measurements on anatomically defined regions of patient-specific aortic meshes.

## question

Aortic remodeling reflects interacting geometric and mechanical processes. This project asks how longitudinal areal growth relates to baseline geometry, including integrated Gaussian curvature, and how available computational fluid dynamics (CFD) fields such as pressure and near-wall velocity vary with those measurements. Finite-element stress is included where it is available.

## approach

The analysis pipeline validates each delivered mesh and its CAMP patch support, preserves the fields actually present in each package, and records missing CFD or finite-element channels rather than filling them with zeros. Analyses are performed across the outer aortic wall (OAW), true lumen (TL), false lumen (FL), and intraluminal thrombus (ILT), where each region has sufficient support.

To make spatial comparisons more defensible, the workflow combines area-weighted field associations with mesh-aware sensitivity analyses. These include component-aware surface graphs and tests that separate broad spatial trends from more local variation. Cohort summaries treat the patient as the unit of aggregation; individual mesh patches are spatially dependent and are not treated as independent patients.

## current scope

The portable cohort workflow has audited 18 patient-specific mesh packages and produces patient-level regional field-coupling summaries, mesh-support quality checks, and spatial sensitivity ranges. Available measurements vary by case, so each analysis reports its actual support and sample rather than assuming that every patient has every field.

In parallel, I am building CT/CTA-to-3D vascular modeling pipelines spanning segmentation, surface reconstruction, mesh processing, and anatomical correspondence, with future extension toward biomechanical stress analysis.

## interpretation

The current results are exploratory. They describe spatial associations in the available cohort and do not establish causal mechanisms or clinical prediction. Method development is ongoing, including evaluation of spatial adjustment and uncertainty procedures before stronger inferential claims are made.
