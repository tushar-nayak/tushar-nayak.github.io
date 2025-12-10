---
layout: page
title: Sparse 2D Echocardiography to 3D Cardiac Reconstruction with Pose Refinement
description: Course Project for Learning for 3D Vision
img:
importance: 3
category: at carnegie mellon
---

---
project status: working (september 2025 - present)
---

Developed a unified framework to reconstruct patient-specific 3D ventricular shapes from sparse 2D echocardiography views. Moving beyond simple per-scan optimization, this work introduces a Test-Time Optimization strategy where a globally learned neural shape prior is fine-tuned on sparse patient data. This approach combines the generalization power of dataset-wide learning with the precision of patient-specific optimization. The core innovation is a "Hybrid" learning strategy that alternates between estimating slice poses and refining a 3D Implicit Neural Representation (INR). The framework supports three distinct operating modes to balance speed and accuracy:


# 1. Frameworks
- Local: Trains a fresh INR from scratch for every single patient. Accurate but slow and prone to overfitting sparse views.
- Global: Learns a single shared cardiac shape prior across the entire training population. Fast inference but lacks patient-specific detail.
- Mixed (Proposed): 
    1.  Pre-training: A global shape prior is learned on the training set.
    2.  Inference: For a new, unseen patient, we initialize the network with the global prior and run a rapid "refinement" optimization loop on the patient's sparse 2D slices. This adapts the generic heart shape to fit the specific patient's anatomy in real-time.


### 2. Architecture
- Representation: Coordinate-based Multi-Layer Perceptron (MLP) representing occupancy signed distance function.
- Differentiable Rendering: A custom vectorized projection layer maps the 3D implicit shape to 2D slice planes (A2C, A4C, PSAX) for direct supervision against clinical contours.
- Pose Refinement: Jointly optimizes rigid slice pose parameters (SE(3)) alongside shape, correcting for acquisition misalignment.
- Meta-Learning Approach (Reptile): Implementation of Reptile-based meta-learning to find an initialization that adapts rapidly to new cardiac geometries with minimal gradient steps.


- Test-Time Refinement: Demonstrates that "overfitting" to a specific patient at test time (via fine-tuning) significantly boosts reconstruction accuracy compared to static inference.
- Implicit Shape Priors: Uses population-level learning to regularize reconstruction in regions where 2D data is missing, preventing the "shape explosion" common in sparse-view reconstruction.
- Strict Slice Selection: Automated stratifiction strategy to select optimal diagnostic views (ED/ES frames) from raw volumetric data.
- Clinical Validation: Evaluates performance using rigorous medical metrics: 3D Dice Coefficient, IoU (Intersection over Union), and clinical volume estimation (End-Diastolic/End-Systolic volumes).


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l3d1.png" title="!" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l2d2.png" title="!" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The method bridges the gap between widely available 2D ultrasound and expensive 3D imaging. By leveraging Test-Time Optimization, we achieve high-fidelity 3D meshes from as few as 3 standard views. The framework handles the inherent sparsity of echocardiography by relying on the learned global prior to "hallucinate" plausible geometry in unobserved regions, while the patient-specific refinement ensures the reconstruction adheres tightly to the observed clinical data.

Collaborators: [Vivek Dhara](https://www.linkedin.com/in/vivek-dhara/) and [Vaibhav Parekh](https://www.linkedin.com/in/vaibhavparekh9/)