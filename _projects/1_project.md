---
layout: page
title: endovasculature deformation estimation and registration
description: 
img: assets/img/newplot.png
importance: 1
category: at carnegie mellon
related_publications: true
---
`project status: ongoing`

I'm working on remote surgical robotics at the Computational Engineering & Robotics Lab at CMU under Dr. Kenji Shimada & doctoral candidate Rishi Basdeo at the Department of Mechanical Engineering and collaborators and clinicians from University of Pittsburgh's [Surreality Lab](https://surreality.pitt.edu/) and neurosurgens from UPMC. 

Here, I'm focusing on the computer vision subsystem, having generated physics informed synthetic blood vessel networks and implementing free form deformation for stenosis along with centerline deformation to simulate guidewire movement.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/newplot.png" title="snippet of my synthetic centerline deformation!" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    snippet of my synthetic centerline deformation!
</div>

My roadmap includes but isn't limited to:
- developing ways to introduce synthetic contrast, thereby decreasing the amount of chemical contrast required while acquiring the fluoroscopy angiographs and predict vessel motion based on the guidewire
- added physics constratints due to blood flow fluid dynamics to determine safe force thresholds for the guidewire to prevent vasculature damage, using the aforementioned deformation estimation. 

We've also completed a comprehensive review of the existing literature in the realm of robotic assisted endovascular surgery, which I've written the vision sub-system of (and is currently sent to Springer Nature's Journal of Intelligent and Robotics Systems!).

# {% endraw %}
