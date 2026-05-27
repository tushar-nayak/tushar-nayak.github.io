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

---

## project status: currently paused (January - September 2025)

Conducted during the Spring and Summer semesters of 2025 under [Dr. Pulkit Grover](https://users.ece.cmu.edu/~pgrover/), [Dr. Aswin Sankaranarayanan](https://users.ece.cmu.edu/~saswin/) and [Dr. Matthew J Shepard, MD](https://findcare.ahn.org/Matthew-J-Shepard), this study is complementary to a Partial Differential Equation based approach by [Cynthia Han](https://www.linkedin.com/in/cynthiashan/) a fellow graduate student researcher. Both approaches use a multi-modal approach that combine FLAIR, T1, T2 and CT1 modalities of brain MRI from the LUMIERE dataset.

I worked on a Neural Ordinary Differential (N-ODE) network framework designed to model and predict tumor growth dynamics from longitudinal MRI data. By encoding a patient’s tumor size measurements over time into interpretable kinetic parameters, the N-ODE formulates tumor progression as a continuous-time dynamical system, allowing for unbiased and personalized predictions, even from early-stage data.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/allmri.png" title="prelimnary results of my model (actually) predicting a future timepoint of the tumour growth!" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    prelimnary results of my model (actually!) predicting a future timepoint of the tumour growth across all four modalities
</div>

- the model uses a encoder-neural ordinary DE-decoder model with a combined loss approach, integrating Mean Squared Error to match anatomical details and Dice Loss to ensure accurate tumor segmentation, thus optimizing both image fidelity.
- the model's encoder-decoder architecture not only improves future tumor size predictions but also produces metrics that strongly predict overall survival.

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
    me presenting this work at carnegie mellon's 2025 forum by the biomedical engineering department
</div>

## related approaches across branches

This project evolved through a few related modeling directions.

The earliest recovered version was a rough Neural ODE prototype built from the original source code. That branch established the basic idea of using an attention U-Net
encoder, temporal conditioning, and a latent ODE block for glioblastoma forecasting.

I then cleaned that into a runnable `neural-ode-implementation` branch. That version turned the recovered idea into a proper pipeline for the local patient data, using a
2D slice-based attention U-Net + Neural ODE model, strict holdout evaluation, and a persistence baseline for comparison.

After that, I shifted to a `history-conditioned-forecast` branch that reframed the task as prefix-history prediction: use all earlier MRI weeks for a patient and forecast
the next one. In that version, each historical week is encoded separately, a learned week embedding is added, the latent history is aggregated, and the Neural ODE evolves
the state forward in continuous time before decoding the future scan.

The `history-conditioned-forecast-slim` branch is a slimmer merged version of that same prefix-history line, keeping the forecasting idea while trimming the branch down.

In parallel, there was also a separate `physics-dual-patient-rerun` branch that explored a physics-informed 3D forecasting pipeline. That approach treated the MRI
evolution as a more explicit dynamics problem rather than a learned latent forecast, and it used the same local patient set for comparison.

Across all of these branches, the common goal was the same: model glioblastoma progression from longitudinal MRI data and compare learned forecasts against simple
persistence baselines.
