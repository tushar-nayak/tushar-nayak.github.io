---
layout: page
title: Deformable 3D Surgical Scene Reconstruction
description: A surgical vision prototype that combines depth-based point clouds, deformable 3D Gaussian splatting, and VLM-guided semantic querying for endoscopic scenes.
img: assets/img/pointcloud2.gif
importance: 1
category: personal projects
github: https://github.com/tushar-nayak/endo-splat/
website: https://tushar-nayak.github.io/endo-splat/
status: active
tags: [Surgical Robotics, 3D Vision, Gaussian Splatting, VLMs]
---

    ---
    project status: current working on it!
    ---

EndoSemantic-Splat is a reference implementation of a real-time, deformable 3D scene reconstruction pipeline designed for dynamic endoscopic and laparoscopic environments. The code in this repository focuses on a dependency-light Python implementation of the core ideas: sparse point-cloud initialization from depth, Gaussian splatting style rendering, deterministic open-vocabulary semantic querying, and a smooth deformation field with a structural regularizer.

The Python project lives under `code/`. Run the commands below from that directory. Local datasets can sit at the repository root, where `c3vd/` and `endoscapes/` are gitignored.

To enable open-vocabulary semantic tracking, this pipeline integrates Vision-Language Model (VLM) embeddings directly into the deformable Gaussian point cloud.

## Key Features

- **VLM-Embedded Point Clouds:** Lifts 2D semantic segmentations from surgical frames into 3D space, allowing for zero-shot text queries to locate specific tools, tissues, or anatomical landmarks within the operative cavity.
- **Physics-Grounded Deformation:** Enforces structural limits on tissue deformation using a geometrically-regularized loss function embedded with discrete differential geometry, ensuring that the forward-mapping deformation MLP produces physically plausible soft-tissue dynamics.
- **NeRF-Regularized Specular Handling:** Utilizes coordinate-based neural implicit representations to model the complex specular reflections of biological fluids, decoupling view-dependent lighting from the explicit 3DGS geometry.
- **Real-Time Inference:** Optimized custom CUDA kernels allow for continuous spatial tracking and rendering at >100 fps.

## System Architecture

1. **Initialization:** A sparse point cloud is initialized from stereo endoscopic depth maps, filtering out tool occlusions via mask-guided training.
2. **Semantic Lifting:** VLM features (via CLIP/LSeg) are extracted from multi-view 2D frames and baked into the covariance matrix of the 3D Gaussians.
3. **Dynamic Tracking:** As the camera moves or tissue deforms, a temporal quad-encoder framework tracks the spatial shifts, applying volumetric BCE point sampling to supervise unobserved or occluded 3D regions.
