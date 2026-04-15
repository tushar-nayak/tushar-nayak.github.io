---
layout: page
title: Spatiotemporal Glioblastoma Evolution Visual Prediction
description: Research at The ∀ Lab & Image Science Lab
img: assets/img/gbp1.png
importance: 2
category: at carnegie mellon
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

<div style="max-width: 520px; margin: 24px auto; text-align: center;">
  <a href="https://github.com/tushar-nayak/glioblastoma-evolution"
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
      <span>glioblastoma-evolution</span>
    </div>
    
    <div style="font-size: 0.95rem; opacity: 0.8;">
      View the source code
    </div>
  </a>
</div>
