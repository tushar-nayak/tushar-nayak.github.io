---
layout: page
title: Physics-Informed Endovasculature Deformation Estimation And Registration
description: Research at CERLAB (master's thesis)
img: assets/img/newplotx.png
importance: 1
category: at carnegie mellon
github: https://github.com/katahar/telesurgery_cerlab/tree/deformation-graph/cv/deformable_registration
status: ongoing
tags: [Surgical Robotics, Medical Imaging, 3D Vision, Physics-Informed ML]
featured: true
featured_kind: research
related_publications: false
---

---

## project status: ongoing

I'm working on remote surgical robotics at the Computational Engineering & Robotics Lab at CMU under Dr. Kenji Shimada & doctoral candidate Rishi Basdeo at the Department of Mechanical Engineering, with collaborators and clinicians from University of Pittsburgh's [Surreality Lab](https://surreality.pitt.edu/) and neurosurgeons from UPMC.

My focus is on the **computer vision subsystem** — building a full pipeline from physics-informed synthetic data generation through deep network training for intra-operative vessel deformation prediction.

We've also completed a comprehensive literature review in the realm of robotic-assisted endovascular surgery, which I've written the vision sub-system section of (currently under review at Springer Nature's _Journal of Intelligent and Robotics Systems_).

---

## the problem

During endovascular procedures, a guidewire is navigated through blood vessels under live X-ray (fluoroscopy). As the wire advances, it deforms the vessel wall. Predicting _how_ the vessel deforms — before it tears — requires knowing the 3D displacement of the vascular centerline from a 2D X-ray projection. This is an inherently ill-posed inverse problem.

---

## synthetic data pipeline

Since ground-truth intra-operative 3D vessel deformation data doesn't exist at scale, I generate it synthetically using physics simulation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/newplot.png" title="Synthetic centerline deformation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Synthetic centerline deformations generated via free-form deformation (FFD). Each frame captures a unique vessel state driven by guidewire interaction physics.
</div>

Each simulated frame yields:

- **Sparse 3D displacement fields** — ground-truth deformation vectors at 20 control points along the centerline
- **Multi-view synthetic X-rays** — rendered via `gVirtualXRay` across 6 clinically relevant projections: `AP`, `Lateral`, `LAO45`, `RAO45`, `Spider`, and `RAO30_Caudal20`
- **Physics metrics** — per-frame max displacement (mm), mesh surface strain ratio, and vessel straightening percentage

I built an auditing tool to validate the physics integrity of the entire dataset, verifying that mesh strain stays within the clinical safety threshold of **1.15** (a proxy for vascular damage risk) and that deformations are physically meaningful.

---

## neuroDeformNet: multimodal deformation network

The core contribution is **MorphPINN**, a multimodal network that fuses 2D X-ray image features with 3D geometric context to predict full 3D vessel deformation from a single fluoroscopy frame.

The architecture has three branches:
**1. Vision Backbone** — A ResNet-18 modified to accept single-channel (grayscale) X-ray images. Produces a 512-dimensional feature vector capturing vascular appearance and deformation cues.
**2. 3D + Camera Encoder** — A lightweight MLP that jointly encodes the 20 centerline control points in their rest configuration (60 values) and the 3×3 camera projection matrix (9 values) into a 128-dimensional geometric feature.
**3. Fusion Predictor** — The 512 image features and 128 geometric features are concatenated (640-dim) and passed through a 3-layer MLP with dropout, predicting a **20 × 3 displacement field** — one 3D shift vector per control point.

---

## physics-constrained loss

Training uses a composite loss that enforces both accuracy and physical plausibility:

$$\mathcal{L} = w_{\text{mse}} \cdot \mathcal{L}_{\text{MSE}} + w_{\text{smooth}} \cdot \mathcal{L}_{\text{smooth}} + w_{\text{proj}} \cdot \mathcal{L}_{\text{proj}}$$

| Term                            | Weight | Purpose                                                     |
| ------------------------------- | ------ | ----------------------------------------------------------- |
| $$\mathcal{L}_{\text{MSE}}$$    | 1.0    | Penalizes deviation from ground-truth displacement          |
| $$\mathcal{L}_{\text{smooth}}$$ | 0.1    | Enforces deformation smoothness along the centerline        |
| $$\mathcal{L}_{\text{proj}}$$   | 1e-5   | Penalizes geometric inconsistency with the X-ray projection |

A hard strain cap of **1.15** is embedded in the loss, directly encoding the clinical safety constraint that prevents predictions from implying unsafe force thresholds on the vessel wall.

---

## roadmap

- [x] Physics-informed synthetic data generation (FFD + guidewire kinematics)
- [x] Multi-view X-ray rendering pipeline (6 clinical projections via gVXR)
- [x] Dataset physics auditing and validation
- [x] NeuroDeformNet architecture and training pipeline
- [x] Comprehensive literature review (under review, JIRS)
- [ ] Synthetic contrast injection to reduce chemical contrast agent dose
- [ ] Blood flow fluid dynamics integration for force threshold estimation
- [ ] Full intra-operative vessel motion prediction from guidewire state
