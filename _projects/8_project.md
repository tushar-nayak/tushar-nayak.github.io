---
layout: page
title: CTA to Mesh & PointCloud Coronary Artery Segmentation using Residual 3D U-Net
description: Course Project for Image Based Computational Modelling & Analysis
img: assets/img/cma.png
importance: 3
category: at carnegie mellon - course projects
---


project status: completed 
[:link:](https://tushar-nayak.github.io/assets/pdf/42640.pdf) [Project Report](https://tushar-nayak.github.io/assets/pdf/42640.pdf)


This project builds an end-to-end 3D deep learning pipeline for automatic coronary artery segmentation and geometric reconstruction from CT angiography (CTA). Using a ResUNet3D backbone with hybrid Dice–BCE loss and a dedicated geometric post-processing stage, the system outputs clean 3D meshes and point clouds of the coronary tree suitable for surgical planning and simulation. 

Coronary CTA provides rich volumetric data, but converting these scans into usable 3D vessel models is still mostly manual, slow, and operator-dependent.  The goal of this project is to automate that workflow so that high-fidelity coronary meshes can be generated directly from volumetric scans for applications in diagnosis, robotic navigation, and hemodynamic simulation.

- Backbone: 3D residual U-Net (ResUNet3D) with encoder–decoder architecture and skip connections for volumetric artery segmentation.    
- Hybrid Loss: Compound Dice + Binary Cross Entropy loss to handle severe class imbalance while sharpening vessel boundaries.    
- Training Strategy: Mixed-precision training (autocast + GradScaler) to fit large 3D volumes and accelerate training on CUDA GPUs.    
- Preprocessing: Intensity clipping to a coronary HU window and resampling to a uniform 3D grid for stable training.  

Geometric Post-processing

- Probability to Mask: Adaptive thresholding of network outputs to capture faint, low-contrast vessels.    
- Cleanup: Morphological opening and connected-component filtering to remove noise and retain the main coronary tree.    
- Surface Reconstruction: Marching Cubes for watertight mesh extraction, followed by Laplacian smoothing to reduce voxelization artifacts while preserving branching structure.    
- Visualization: Generation of both point clouds and triangulated meshes, enabling inspection from multiple viewpoints and downstream use in surgical/CFD tools.  

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh1.gif" title="Reconstruction" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pointcloud1.gif" title="Middle Slice GT v/s Reconstruction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh2.gif" title="Reconstruction" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pointcloud2.gif" title="Middle Slice GT v/s Reconstruction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Collaborators: [Jared Scott](https://jaredescott.github.io)