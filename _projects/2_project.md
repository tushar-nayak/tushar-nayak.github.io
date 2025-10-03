---
layout: page
title: spatiotemporal glioblastoma evolution prediction
description: a project with a background image and giscus comments
img: assets/img/gbp1.png
importance: 2
category: at carnegie mellon
# giscus_comments: true
---

---
project status: currently paused (January - September 2025)
---

Conducted during the Spring and Summer semesters of 2025 under [Dr. Pulkit Grover](https://users.ece.cmu.edu/~pgrover/), [Dr. Aswin Sankaranarayanan](https://users.ece.cmu.edu/~saswin/) and [Dr. Matthew J Shepart, MD](https://findcare.ahn.org/Matthew-J-Shepard), this study is complementary to a Partial Differential Equation based approach by a [fellow graduate student researcher](https://www.linkedin.com/in/cynthiashan/). Both approaches use a multi-modal approach that combine FLAIR, T1, T2 and CT1 modalities of brain MRI from the LUMIERE dataset.

I worked on a Neural Ordinary Differential (N-ODE) network framework designed to model and predict tumor growth dynamics from longitudinal MRI data. By encoding a patient’s tumor size measurements over time into interpretable kinetic parameters, the N-ODE formulates tumor progression as a continuous-time dynamical system, allowing for unbiased and personalized predictions, even from early-stage data. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/image1.png" title="prelimnary results of my model (actually) predicting a future timepoint of the tumour growth!" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    prelimnary results of my model (actually) predicting a future timepoint of the tumour growth
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




