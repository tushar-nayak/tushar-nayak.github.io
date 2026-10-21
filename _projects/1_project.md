---
layout: page
title: "FluoroGRID: Real-Time 3D Vascular Deformation from Monocular Fluoroscopy"
description: Estimates patient-specific 3D neurovascular deformation from a single fluoroscopic view by fusing image evidence, pre-operative anatomy, and camera geometry.
img: assets/img/newplotx.png
importance: 1
category: at carnegie mellon
github: https://github.com/katahar/telesurgery_cerlab/tree/deformation-graph/cv/deformable_registration
status: manuscript in preparation
tags: [Surgical Robotics, Medical Imaging, 3D Vision, Physics-Informed ML]
featured: true
featured_kind: research
homepage_featured: true
homepage_order: 1
related_publications: false
---

## summary

My master's thesis work at CERLAB under Dr. Kenji Shimada, with doctoral candidate Rishi Basdeo and collaborators at the University of Pittsburgh and UPMC. **FluoroGRID** estimates patient-specific 3D vascular deformation from monocular fluoroscopy in real time, combining live image evidence with pre-operative anatomy, camera geometry, and sparse vascular control points.

Initial results were presented at the [2nd International Workshop on the Evolving Landscape of Surgical Robotics (ELSR), IEEE/RSJ IROS 2026]({{ '/publications/' | relative_url }}#nayak2026elsr_workshop), and a full manuscript is in preparation for IPCAI 2027 / IJCARS.

## problem

During endovascular procedures, a guidewire is navigated through blood vessels under live X-ray. As the wire advances, it deforms the vessel wall. Predicting that deformation before it becomes unsafe requires recovering 3D vessel displacement from a 2D fluoroscopic projection, which is a severely ill-posed inverse problem.

The clinical constraint makes it harder: intra-operative guidance is only useful if the estimate arrives in real time, and only trustworthy if the predicted deformation is physically plausible rather than merely well-fit to the image.

## approach

Since ground-truth intra-operative 3D vessel deformation does not exist at scale, I generate it synthetically using physics simulation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/newplot.png" title="Synthetic centerline deformation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Synthetic centerline deformations generated via free-form deformation (FFD). Each frame captures a unique vessel state driven by guidewire interaction physics.
</div>

The pipeline produced **over 370,000 paired 3D–2D training examples** spanning diverse viewing geometries and deformation conditions. Each simulated frame yields:

- **Sparse 3D displacement fields** at control points along the vessel centerline
- **Multi-view synthetic X-rays** across clinically relevant projections such as `AP`, `Lateral`, `LAO45`, `RAO45`, `Spider`, and `RAO30_Caudal20`
- **Physics metrics** including maximum displacement, mesh strain ratio, and vessel straightening percentage

I built an auditing tool to validate the physics integrity of the generated dataset, verifying that mesh strain stays within the clinical safety threshold of **1.15** and that the simulated deformations remain physically meaningful.

### quad-encoder architecture

FluoroGRID is a geometric deep learning system with four encoders, each supplying a different kind of evidence about the same vessel state:

- **Image encoder** — ResNet features from the single-channel fluoroscopic frame
- **Graph encoder** — ordered-chain graph representation of the vessel centerline, preserving its connectivity
- **Mesh encoder** — sampled geometry from the patient's pre-operative vascular surface
- **Acquisition encoder** — fluoroscopic camera and projection metadata

Fusing anatomy and acquisition geometry alongside the image is what makes the inverse problem tractable: the network is not asked to hallucinate depth from pixels alone, but to deform a known patient-specific geometry consistently with what the projection shows.

### geometry-aware objectives

Training uses a composite objective that enforces both accuracy and physical plausibility:

- **Differentiable projection** — predicted 3D deformation must reproject consistently onto the observed fluoroscopic view
- **Structural smoothness** — deformation varies smoothly along the centerline rather than jumping between adjacent points
- **Curvature constraints** — discrete differential geometry terms keep the deformed vessel shape anatomically plausible
- **Strain capping** — the clinical safety threshold of 1.15 is embedded directly in the loss, preventing predictions that would imply unsafe force on the vessel wall

## current result

FluoroGRID achieves **sub-millimeter reconstruction precision at real-time inference speed**, which is the combination that matters for intra-operative use. The system covers the full loop: physics-grounded synthetic deformation generation, multi-view X-ray rendering, dataset auditing, quad-encoder model training, and evaluation across viewing geometries.

Related outputs from this thread include a [CMU Graduate Research Forum poster]({{ '/assets/pdf/tusharn-poster.pdf' | relative_url }}) on physics-regularized deep graph networks for thrombectomy deformation, and a <a href="{{ '/publications/' | relative_url }}#basdeo2025review_robotics_neuroendovascular">review of robotics in autonomous and remote neuroendovascular intervention</a> currently under review at the _Journal of Intelligent and Robotic Systems_, for which I wrote the vision subsection.

## limitations

- No large-scale real intra-operative ground-truth deformation dataset exists yet, so validation leans on synthetic physics
- The current formulation focuses on centerline motion rather than full vessel wall mechanics
- Blood flow and force thresholds are not yet coupled to the deformation estimate

## next steps

- [x] Physics-informed synthetic data generation (FFD + guidewire kinematics)
- [x] Multi-view X-ray rendering pipeline (6 clinical projections via gVXR)
- [x] Dataset physics auditing and validation
- [x] Quad-encoder FluoroGRID architecture and training pipeline
- [x] Workshop presentation at ELSR, IEEE/RSJ IROS 2026
- [ ] Full manuscript submission (IPCAI 2027 / IJCARS)
- [ ] Synthetic contrast injection to reduce chemical contrast agent dose
- [ ] Blood flow fluid dynamics integration for force threshold estimation
- [ ] Validation against real intra-operative fluoroscopy sequences
