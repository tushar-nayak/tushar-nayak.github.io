---
layout: page
title: "Sparse-View Cardiac Reconstruction with Neural Implicit Representations"
description: Completes 3D left-ventricular geometry from three annotated echocardiography sections, scored only on the voxels the model never observed.
img: assets/img/gxa.png
importance: 2
category: at carnegie mellon
github: https://github.com/tushar-nayak/heart-maker
status: manuscript in preparation
tags: [3D Vision, Medical Imaging, Cardiac Reconstruction, Gaussian Fields]
featured: true
homepage_featured: true
homepage_order: 2
---

## summary

Recovering cardiac geometry from a handful of annotated sections is an underdetermined inverse problem: many shapes agree with the observations and differ everywhere else. This work studies coordinate-based implicit neural representations (INRs) for completing the left-ventricular label of the [MITEA](https://www.cardiacatlas.org/mitea/) dataset from **three known orthogonal sections**, under an evaluation protocol that scores _only voxels outside the observed sections_.

A compact per-subject Fourier-feature INR reaches **0.932 unobserved-voxel Dice** on a development subject, against **0.899** for a Gaussian occupancy field trained on identical observations. The more useful findings are negative: that overlap coexists with fragmented surfaces, and that the topology metric we started with turns out to measure label artifacts rather than anatomy.

With [Vivek Dhara](https://www.linkedin.com/in/vivek-dhara/) and [Vaibhav Parekh](https://www.linkedin.com/in/vaibhavparekh9/). The INR line began as a _Learning for 3D Vision_ course project and was rebuilt under a stricter protocol; a manuscript is in preparation.

## problem

Clinically, left-ventricular volumes are usually estimated from two apical views using the biplane method of disks — completing 3D shape from two sections under a strong geometric assumption. We study that same completion problem with learned continuous representations.

The core difficulty is that a continuous representation does not buy anatomical accuracy. Any two fields that agree on the observed set have identical loss, whatever they predict elsewhere. Whatever completion the method returns is selected by the _implicit bias_ of the encoding, network, initialization, and optimizer. So the experiment measures that implicit selection; it does not assume it is correct.

## evaluation protocol

Getting the protocol right was most of the work, because the obvious shortcuts all leak information:

- **Unobserved-voxel scoring.** Metrics are computed on $\mathcal{U} = \Omega_h \setminus \mathcal{O}$, excluding every supervised voxel. Whole-volume overlap flatters the model by rewarding it for reproducing its own training data.
- **Label-independent plane placement.** Plane indices come from array dimensions only, never from searching hidden labels for foreground. Foreground-aware slice selection would hand the method part of its answer.
- **No threshold tuning.** Predictions are thresholded at 0.5; the threshold is never fit on the held-out target.
- **Per-subject then aggregate.** Pooling all voxels across subjects weights larger hearts more heavily and estimates a different quantity.

Dice and IoU are reported for familiarity while noting they are algebraically related ($D = 2J/(1+J)$) and encode the same counts.

## INR formulation

Occupancy is parameterized as $f_\theta(\mathbf{x}) = \sigma(g_\theta(\gamma(\mathbf{x})))$ with a Fourier positional encoding

$$\gamma(\mathbf x)=\left[\sin(2^\ell\pi\mathbf x),\cos(2^\ell\pi\mathbf x)\right]_{\ell=0}^{3}$$

giving 24 channels. The network is deliberately small — three width-64 hidden layers, four linear layers, **9,985 trainable parameters**. Training minimizes observed-voxel binary cross-entropy on minibatches drawn from the deduplicated union of plane voxels, so intersections count once. No population prior, no dense label loss, no explicit smoothness term.

## results

Development subject MITEA_071, seed 17, native $146\times140\times122$ lattice, planes $z{=}72$ / $y{=}69$ / $x{=}60$ (54,925 distinct observed voxels), Adam at $10^{-3}$ for 1,000 updates:

| Field              | Dice       | Unobserved Dice | IoU        | Volume error | Parameters |
| ------------------ | ---------- | --------------- | ---------- | ------------ | ---------- |
| **INR**            | **0.9360** | **0.9323**      | **0.8798** | 9.33 mL      | 9,985      |
| Gaussian occupancy | 0.9018     | 0.8987          | 0.8211     | 34.76 mL     | 1,792      |

Both fields receive identical observed coordinates, labels, minibatch indices, loss, and update counts — verified through a saved SHA-256 fingerprint of the supervision. Matching updates does not match capacity, which is why the parameter counts are reported alongside.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l3d1.png" title="Reconstructed cardiac geometry" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l3d2.png" title="Held-out slice: reference versus reconstruction" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Recovered geometry and a held-out slice comparison. Evaluation slices lie outside all three supervised planes.
</div>

## what the geometry diagnostics actually measured

Two findings here mattered more than the overlap scores.

**High overlap does not imply a usable surface.** The INR's favorable Dice coexists with a mesh carrying **15 connected components and 144 boundary edges** — small fragments detached from the main body, and an open surface, so closed-surface curvature is simply unavailable rather than silently capped. The Gaussian field produced the opposite profile: a closed, single-component mesh with Euler characteristic 2, at lower accuracy.

**The topology metric was measuring label defects.** We evaluated integrated Gaussian curvature $\mathcal{K}(M) = \sum_v (2\pi - \sum_{f \ni v} \vartheta_{vf})$, intending it as a shape check. By discrete Gauss–Bonnet, $\mathcal{K}(M) = 2\pi\chi(M)$ — so $\Delta K$ diagnoses _Euler-characteristic mismatch_, not local shape error, and $\Delta K = 0$ does not imply anatomical correctness. Worse, in practice every nonzero $\Delta K$ in our pilot traced to **single-voxel holes in the reference labels** that the Gaussian fields filled in: MITEA_071 has one, MITEA_052 has four. The reference mesh's "second component" is the surface of an enclosed hole, not anatomy. Topology diagnostics on label-derived references need hole filling first, or they measure annotation noise.

## observed loss is not a model-selection signal

A Gaussian development sweep across three subjects and three seeds showed observed-plane initialization plus a higher learning rate improving mean Dice from 0.8907 to 0.9174 and halving volume error, with all nine paired runs improving. But extending the best setting from 1,000 to 3,000 updates **reduced sampled BCE from 0.0332 to 0.0210 while degrading completion** (Dice 0.9306 → 0.9144).

Fitting the observations better made the unobserved reconstruction worse. On an underdetermined problem, the training objective cannot be trusted for stopping or selection — which is the whole reason the unobserved-voxel protocol exists.

Separately, a sampled-point diagnostic reported IoU 0.9487 where whole-grid IoU was 0.8956 on the same fit. The sampling distribution materially changes the number, so sampled and native-grid metrics are kept separate rather than reported interchangeably.

## limitations

Stated plainly, because they bound every number above:

- The sparse INR result is **one subject, one seed** — a feasibility demonstration, not a generalization estimate
- No matched multi-subject INR comparison, no simple interpolation baseline, no physical surface-distance evaluation, no untouched test-set evaluation
- The binary target is the **union** of myocardium and cavity, so these are not cavity-volume, ejection-fraction, or myocardial-mass errors
- Sections resampled from a common labeled volume omit acquisition artifacts, uncertain pose, motion, and segmentation error — this is not image-based reconstruction
- Preliminary hybrid-supervised initialization experiments (population pretraining and a Reptile-style meta-initialization) used **full-volume labels during refinement**, so they measure hybrid-supervised fitting rather than sparse completion, and are reported separately rather than mixed into the headline numbers

## next steps

- [x] Unobserved-voxel evaluation protocol with label-independent plane placement
- [x] Matched INR versus Gaussian occupancy comparison under fingerprinted supervision
- [x] Mesh validity and topology diagnostics, including their failure modes
- [ ] Subject-level test cohort with locked partitions and multi-subject INR comparison
- [ ] Interpolation baseline wherever its observation geometry applies
- [ ] Physical surface distances alongside overlap
- [ ] Vary the number and orientation of observed planes
- [ ] Separate cavity and myocardial labels; both cardiac phases; pathological subgroups
