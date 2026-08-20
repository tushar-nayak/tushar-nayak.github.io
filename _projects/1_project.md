---
layout: page
title: Physics-Informed Endovasculature Deformation Estimation And Registration
description: Estimates intra-operative neurovascular deformation by registering sparse fluoroscopy with pre-operative CTA.
img: assets/img/newplotx.png
importance: 1
category: at carnegie mellon
github: https://github.com/katahar/telesurgery_cerlab/tree/deformation-graph/cv/deformable_registration
status: ongoing
tags: [Surgical Robotics, Medical Imaging, 3D Vision, Physics-Informed ML]
featured: true
featured_kind: research
homepage_featured: true
homepage_order: 1
related_publications: false
---

## summary

I am building the computer vision subsystem for an endovascular robotic telesurgery platform at CERLAB under Dr. Kenji Shimada and doctoral candidate Rishi Basdeo, with collaborators at the University of Pittsburgh and UPMC. The goal is to estimate intra-operative vessel deformation from fluoroscopy and register that motion back to pre-operative vascular anatomy.

## problem

During endovascular procedures, a guidewire is navigated through blood vessels under live X-ray. As the wire advances, it deforms the vessel wall. Predicting that deformation before it becomes unsafe requires recovering 3D vessel displacement from a 2D fluoroscopic projection, which is a severely ill-posed inverse problem.

## approach

Since ground-truth intra-operative 3D vessel deformation data does not exist at scale, I generate it synthetically using physics simulation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/newplot.png" title="Synthetic centerline deformation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Synthetic centerline deformations generated via free-form deformation (FFD). Each frame captures a unique vessel state driven by guidewire interaction physics.
</div>

Each simulated frame yields:

- **Sparse 3D displacement fields** at 20 control points along the centerline
- **Multi-view synthetic X-rays** across clinically relevant projections such as `AP`, `Lateral`, `LAO45`, `RAO45`, `Spider`, and `RAO30_Caudal20`
- **Physics metrics** including maximum displacement, mesh strain ratio, and vessel straightening percentage

I built an auditing tool to validate the physics integrity of the generated dataset, verifying that mesh strain stays within the clinical safety threshold of **1.15** and that the simulated deformations remain physically meaningful.

The learning model is **MorphPINN**, a multimodal network that fuses 2D X-ray image features with 3D geometric context to predict full 3D vessel deformation from a single fluoroscopy frame.

The architecture has three branches:

- **Vision backbone**: a ResNet-18 modified for single-channel fluoroscopy
- **Geometry and camera encoder**: an MLP over rest-state centerline points and projection geometry
- **Fusion predictor**: a deformation regressor over the combined image and geometric features

Training uses a composite loss that enforces both accuracy and physical plausibility:

$$\mathcal{L} = w_{\text{mse}} \cdot \mathcal{L}_{\text{MSE}} + w_{\text{smooth}} \cdot \mathcal{L}_{\text{smooth}} + w_{\text{proj}} \cdot \mathcal{L}_{\text{proj}}$$

| Term                            | Weight | Purpose                                                     |
| ------------------------------- | ------ | ----------------------------------------------------------- |
| $$\mathcal{L}_{\text{MSE}}$$    | 1.0    | Penalizes deviation from ground-truth displacement          |
| $$\mathcal{L}_{\text{smooth}}$$ | 0.1    | Enforces deformation smoothness along the centerline        |
| $$\mathcal{L}_{\text{proj}}$$   | 1e-5   | Penalizes geometric inconsistency with the X-ray projection |

A hard strain cap of **1.15** is embedded in the loss, directly encoding the clinical safety constraint that prevents predictions from implying unsafe force thresholds on the vessel wall.

## current result

The current system already covers the full engineering loop: synthetic deformation generation, multi-view X-ray rendering, dataset auditing, multimodal model training, and a literature review on robotic endovascular vision systems with the vision subsection written for a journal submission currently under review at _Journal of Intelligent and Robotic Systems_.

## limitations

- No large-scale real intra-operative ground-truth deformation dataset exists yet
- The current setup focuses on centerline motion rather than full vessel wall mechanics
- Blood flow and force thresholds are not yet coupled to the deformation estimate

## next steps

- [x] Physics-informed synthetic data generation (FFD + guidewire kinematics)
- [x] Multi-view X-ray rendering pipeline (6 clinical projections via gVXR)
- [x] Dataset physics auditing and validation
- [x] MorphPINN architecture and training pipeline
- [x] Comprehensive literature review (under review, JIRS)
- [ ] Synthetic contrast injection to reduce chemical contrast agent dose
- [ ] Blood flow fluid dynamics integration for force threshold estimation
- [ ] Full intra-operative vessel motion prediction from guidewire state
