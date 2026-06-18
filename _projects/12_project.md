---
layout: page
title: Full-Volume Lung CT Segmentation and Surface Export
description: A real-data MONAI and VTK pipeline that segments full chest CT volumes, exports lung surfaces, and reports validation metrics for navigation-prep experiments.
img: https://tushar-nayak.github.io/lungvolseg/assets/results/best_case_overlay.png
importance: 2
category: personal projects
github: https://github.com/tushar-nayak/lungvolseg
website: https://tushar-nayak.github.io/lungvolseg/
status: completed
tags: [Medical Imaging, CT, Segmentation, Surface Export]
---

## summary

LungVolSeg is a reproducible engineering pipeline for full-volume chest CT lung segmentation, surface extraction, and metric reporting. The goal was to build something closer to a navigation-prep system than a one-off segmentation notebook.

## problem

Robotic bronchoscopy and related lung navigation workflows rely on CT-derived anatomical understanding. Before navigation, a CT scan is commonly used for planning, segmentation, registration, and 3D visualization. A practical navigation-prep pipeline therefore has to manage spatial metadata correctly, segment anatomy in 3D, export geometric surfaces, and report quantitative validation metrics.

## approach

The pipeline focuses on the engineering substrate of that workflow rather than claiming clinical deployment. It is built from standard open-source imaging tools:

- SimpleITK for medical image IO and spatial preprocessing
- MONAI for 3D medical image segmentation
- VTK for surface extraction and mesh export
- PyTorch for model optimization

The first real-data target is binary lung segmentation from full-volume CT scans because it provides a stable organ-level surface for navigation-prep experiments.

### dataset

The pipeline uses the **COVID-19 CT Lung and Infection Segmentation Dataset** hosted on Zenodo.

- DOI: `10.5281/zenodo.3757476`
- License: `CC-BY-4.0`
- Cases: 20 labeled full CT scans
- Downloaded archives: `COVID-19-CT-Seg_20cases.zip` and `Lung_Mask.zip`

The original dataset includes left lung, right lung, and infection annotations. This implementation converts the lung masks into a binary target:

- `0`: background
- `1`: lung

### pipeline

The workflow performs the following steps:

1. Download CT and lung-mask archives from Zenodo
2. Verify archive MD5 checksums
3. Extract NIfTI volumes
4. Pair CT volumes with lung masks
5. Crop around the lung-mask bounding box
6. Clip CT intensities to `[-1000, 400]` HU and normalize to `[0, 1]`
7. Resize each case to a compact 3D target shape
8. Train a MONAI 3D UNet
9. Run inference on prepared cases
10. Export predicted lung surfaces as `.stl` and `.vtp`
11. Compute Dice and HD95 metrics
12. Generate a model card

The default target shape is `96 x 128 x 128`. A smaller validation run uses `64 x 96 x 96`.

### model and export

The segmentation model is a MONAI 3D UNet with `in_channels=1`, `out_channels=2`, channel schedule `(16, 32, 64, 128)`, residual blocks, and `0.1` dropout. Training uses `DiceCELoss` with Adam at learning rate `1e-3`.

Inference uses sliding-window prediction. VTK then extracts and smooths surfaces and exports:

- `lung.stl`
- `lung.vtp`

## result

A full run over all 20 CT cases trained for 25 epochs produced:

- mean lung Dice: `0.9243`
- mean lung HD95: `10.5909`
- best validation Dice: `0.9539`

| Case              |  Dice Lung |   HD95 Lung |
| ----------------- | ---------: | ----------: |
| `zenodo_lung_001` |     0.9921 |      1.0000 |
| `zenodo_lung_002` |     0.9848 |      5.0000 |
| `zenodo_lung_003` |     0.9797 |      5.0000 |
| `zenodo_lung_004` |     0.9880 |      4.0000 |
| `zenodo_lung_005` |     0.9877 |      4.0000 |
| `zenodo_lung_006` |     0.9926 |      1.0000 |
| `zenodo_lung_007` |     0.9893 |      1.4142 |
| `zenodo_lung_008` |     0.9908 |      1.0000 |
| `zenodo_lung_009` |     0.9916 |      1.0000 |
| `zenodo_lung_010` |     0.9886 |      1.0000 |
| `zenodo_lung_011` |     0.8636 |     20.0000 |
| `zenodo_lung_012` |     0.8589 |     18.0000 |
| `zenodo_lung_013` |     0.8678 |     14.6287 |
| `zenodo_lung_014` |     0.8778 |     19.6214 |
| `zenodo_lung_015` |     0.9030 |     19.7484 |
| `zenodo_lung_016` |     0.8414 |     18.4120 |
| `zenodo_lung_017` |     0.7808 |     16.7631 |
| `zenodo_lung_018` |     0.8866 |     20.8087 |
| `zenodo_lung_019` |     0.8747 |     20.4206 |
| `zenodo_lung_020` |     0.8456 |     19.0000 |
| **Mean**          | **0.9243** | **10.5909** |

The first half of the dataset is near-perfect, while a weaker subgroup appears in the second half. That points to structured case difficulty rather than random optimization noise.

## limitations

- The reported top-line result averages predictions over all 20 prepared cases, not a strict external test set
- Compact resizing sacrifices native scanner resolution
- The current split protocol should be hardened into an explicit held-out evaluation
- The target is binary lung, not airway, vessel, lobe, or lesion anatomy
- The generated meshes are suitable for engineering demonstration but are not validated for procedural planning

## next steps

- harden the held-out evaluation protocol
- inspect the weak subgroup of CT cases directly
- extend the pipeline toward navigation-specific anatomy such as airways or lobes

## reproducibility

Install dependencies:

```bash
python3 -m pip install -r requirements.txt
python3 -m pip install -e .
```

Run the documented full pipeline:

```bash
python3 scripts/run_zenodo_lung_pipeline.py \
  --workspace outputs/zenodo_lung_full_e25 \
  --epochs 25 \
  --target-depth 96 \
  --target-height 128 \
  --target-width 128
```
