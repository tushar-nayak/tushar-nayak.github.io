---
layout: page
title: Neural Active Contours
description: VLM-Guided Deformable 3D Gaussian Splatting for Surgical Scenes
img: assets/img/6.jpg
importance: 1
category: personal projects
---

    ---
    project status: current working on it!
    ---

<div style="max-width: 520px; margin: 24px auto; text-align: center;">
  <a href="https://github.com/tushar-nayak/endo-splat/"
     target="_blank"
     style="
       display: block;
       padding: 16px 20px;
       border: 1px solid rgba(128,128,128,0.25);
       border-radius: 10px;
       color: inherit;
       text-decoration: none;
       transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
     "
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 18px rgba(0,0,0,0.08)'; this.style.borderColor='rgba(128,128,128,0.45)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(128,128,128,0.25)'">
    
    <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; margin-bottom: 6px;">
      <svg height="17" width="17" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.01-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>neural-active-contours</span>
    </div>

    <div style="font-size: 0.95rem; opacity: 0.8;">
      View the source code
    </div>

  </a>
</div>

EndoSemantic-Splat is a reference implementation of a real-time, deformable 3D scene reconstruction pipeline designed for dynamic endoscopic and laparoscopic environments. The code in this repository focuses on a dependency-light Python implementation of the core ideas: sparse point-cloud initialization from depth, Gaussian splatting style rendering, deterministic open-vocabulary semantic querying, and a smooth deformation field with a structural regularizer.

The Python project lives under `code/`. Run the commands below from that directory. Local datasets can sit at the repository root, where `c3vd/` and `endoscapes/` are gitignored.

To enable open-vocabulary semantic tracking, this pipeline integrates Vision-Language Model (VLM) embeddings directly into the deformable Gaussian point cloud.

## Key Features

* **VLM-Embedded Point Clouds:** Lifts 2D semantic segmentations from surgical frames into 3D space, allowing for zero-shot text queries to locate specific tools, tissues, or anatomical landmarks within the operative cavity.
* **Physics-Grounded Deformation:** Enforces structural limits on tissue deformation using a geometrically-regularized loss function embedded with discrete differential geometry, ensuring that the forward-mapping deformation MLP produces physically plausible soft-tissue dynamics.
* **NeRF-Regularized Specular Handling:** Utilizes coordinate-based neural implicit representations to model the complex specular reflections of biological fluids, decoupling view-dependent lighting from the explicit 3DGS geometry.
* **Real-Time Inference:** Optimized custom CUDA kernels allow for continuous spatial tracking and rendering at >100 fps.

## System Architecture

1. **Initialization:** A sparse point cloud is initialized from stereo endoscopic depth maps, filtering out tool occlusions via mask-guided training.
2. **Semantic Lifting:** VLM features (via CLIP/LSeg) are extracted from multi-view 2D frames and baked into the covariance matrix of the 3D Gaussians.
3. **Dynamic Tracking:** As the camera moves or tissue deforms, a temporal quad-encoder framework tracks the spatial shifts, applying volumetric BCE point sampling to supervise unobserved or occluded 3D regions.