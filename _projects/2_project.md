---
layout: page
title: Spatiotemporal Glioblastoma Evolution Visual Prediction
description: Research at The ∀ Lab & Image Science Lab
img: assets/img/project_thumbnails/glioblastoma-evolution.png
importance: 2
category: at carnegie mellon
github: https://github.com/tushar-nayak/glioblastoma-evolution
website: https://tushar-nayak.github.io/glioblastoma-evolution/
status: paused
tags: [Medical Imaging, Neural ODEs, MRI, Forecasting]
featured: true
featured_kind: research
# giscus_comments: true
---

## summary

This project explored longitudinal glioblastoma forecasting from multi-modal brain MRI during Spring and Summer 2025 under [Dr. Pulkit Grover](https://users.ece.cmu.edu/~pgrover/), [Dr. Aswin Sankaranarayanan](https://users.ece.cmu.edu/~saswin/), and [Dr. Matthew J Shepard, MD](https://findcare.ahn.org/Matthew-J-Shepard). My track focused on Neural ODE-based forecasting using FLAIR, T1, T2, and contrast-enhanced T1 from the LUMIERE dataset.

## problem

Tumor growth is continuous in time, but clinical MRI arrives as sparse, irregularly sampled snapshots. Forecasting future progression from early scans requires a model that can use limited patient history while still respecting temporal dynamics.

## approach

I built a Neural Ordinary Differential Equation framework that models tumor evolution as a continuous-time latent dynamical system. The project went through several branches, but the common structure was:

- encode historical MRI observations into a latent state
- evolve that state forward with a Neural ODE block
- decode a future MRI estimate or growth trajectory
- compare against persistence baselines and simpler temporal setups

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/allmri.png" title="preliminary MRI forecasting result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Preliminary results from the forecasting pipeline across all four MRI modalities.
</div>

The model uses an encoder-Neural ODE-decoder setup with combined Mean Squared Error and Dice losses to balance anatomical fidelity and tumor-focused segmentation quality. A separate benefit of the framework is that the learned latent dynamics expose interpretable progression parameters that can be useful for survival-related analysis.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item"
                    src="https://www.youtube.com/embed/Rw9KHNOaAL0"
                    allowfullscreen>
            </iframe>
        </div>
    </div>
</div>
<div class="caption">
    Presentation of the work at Carnegie Mellon's 2025 Biomedical Engineering forum.
</div>

## current result

The main outcome was a working longitudinal MRI forecasting framework and a set of related branches that tested different ways of conditioning on history, patient-specific data, and physics-inspired modeling. The work was strong enough to present at Carnegie Mellon’s 2025 Biomedical Engineering forum, but the project is currently paused rather than completed.

## branch evolution

This project evolved through a few related modeling directions.

The earliest recovered version was a rough Neural ODE prototype built from the original source code. That branch established the basic idea of using an attention U-Net encoder, temporal conditioning, and a latent ODE block for glioblastoma forecasting.

I then cleaned that into a runnable `neural-ode-implementation` branch. That version turned the recovered idea into a proper pipeline for the local patient data, using a 2D slice-based attention U-Net + Neural ODE model, strict holdout evaluation, and a persistence baseline for comparison.

After that, I shifted to a `history-conditioned-forecast` branch that reframed the task as prefix-history prediction: use all earlier MRI weeks for a patient and forecast the next one. In that version, each historical week is encoded separately, a learned week embedding is added, the latent history is aggregated, and the Neural ODE evolves the state forward in continuous time before decoding the future scan.

The `history-conditioned-forecast-slim` branch is a slimmer merged version of that same prefix-history line, keeping the forecasting idea while trimming the branch down.

In parallel, there was also a separate `physics-dual-patient-rerun` branch that explored a physics-informed 3D forecasting pipeline. That approach treated the MRI evolution as a more explicit dynamics problem rather than a learned latent forecast, and it used the same local patient set for comparison.

Across all of these branches, the common goal was the same: model glioblastoma progression from longitudinal MRI data and compare learned forecasts against simple persistence baselines.

## limitations

- The dataset size is still small for a high-capacity temporal generative model
- Cross-patient generalization remains harder than within-patient forecasting
- The project was paused before the strongest branch could be fully consolidated and benchmarked

## next steps

- consolidate the best branch into one clean training and evaluation pipeline
- add stronger held-out evaluation and survival-linked analysis
- compare Neural ODE forecasting directly against the complementary PDE-based branch
