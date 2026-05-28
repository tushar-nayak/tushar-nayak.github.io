// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-research",
          title: "research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Selected GitHub repositories and codebases.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "i haven&#39;t taught any courses (yet!), just a record of work as a teaching assistant!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "dropdown-resume",
              title: "resume",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://tushar-nayak.github.io/resume/tushar-nayak-resume.pdf";
              },
            },{id: "dropdown-github",
              title: "github",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://github.com/tushar-nayak";
              },
            },{id: "dropdown-linkedin",
              title: "linkedin",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://www.linkedin.com/in/nayaktushar";
              },
            },{id: "post-how-to-choose-between-explicit-geometry-implicit-fields-and-gaussian-splats",
        
          title: "how to choose between explicit geometry, implicit fields, and gaussian splats",
        
        description: "A practical way to think about 3D representations when you care about sparse clinical reconstruction and not just rendering demos.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/how-to-choose-between-explicit-geometry-implicit-fields-and-gaussian-splats/";
          
        },
      },{id: "post-evaluation-traps-in-biomedical-ai-metrics-that-look-good-but-say-little",
        
          title: "evaluation traps in biomedical ai: metrics that look good but say little",
        
        description: "Why high scores in biomedical AI can still leave you with a model that explains very little and generalizes even less.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/evaluation-traps-in-biomedical-ai-metrics-that-look-good-but-say-little/";
          
        },
      },{id: "post-histopathology-classification-at-multiple-scales-why-context-changes-everything",
        
          title: "histopathology classification at multiple scales: why context changes everything",
        
        description: "Why looking at pathology at more than one magnification can change the answer entirely.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/histopathology-classification-at-multiple-scales-why-context-changes-everything/";
          
        },
      },{id: "post-neural-anisotropic-diffusion-unrolling-a-pde-for-medical-image-denoising",
        
          title: "neural anisotropic diffusion: unrolling a pde for medical image denoising",
        
        description: "How an edge-aware PDE can be turned into a neural network that removes noise without destroying the anatomy that matters.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/neural-anisotropic-diffusion-unrolling-a-pde-for-medical-image-denoising/";
          
        },
      },{id: "post-building-a-lung-ct-pipeline-with-monai-simpleitk-and-vtk",
        
          title: "building a lung ct pipeline with monai, simpleitk, and vtk",
        
        description: "Why putting segmentation, spatial preprocessing, and surface export in one pipeline is much more useful than training a model in isolation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/building-a-lung-ct-pipeline-with-monai-simpleitk-and-vtk/";
          
        },
      },{id: "post-few-shot-2d-echo-to-3d-cardiac-reconstruction-what-actually-makes-it-hard",
        
          title: "few-shot 2d echo to 3d cardiac reconstruction: what actually makes it hard",
        
        description: "Why reconstructing a 3D heart from just a few echocardiography views is much more annoying than it sounds.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/few-shot-2d-echo-to-3d-cardiac-reconstruction-what-actually-makes-it-hard/";
          
        },
      },{id: "post-why-deformation-is-the-hard-problem-in-image-guided-robotic-surgery",
        
          title: "why deformation is the hard problem in image-guided robotic surgery",
        
        description: "Why anatomy that moves, stretches, and bends turns guidance into a much harder vision problem than it first appears.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/why-deformation-is-hard-in-image-guided-robotic-surgery/";
          
        },
      },{id: "post-how-i-moved-from-biomedical-engineering-into-robotic-surgery-research",
        
          title: "how i moved from biomedical engineering into robotic surgery research",
        
        description: "How image processing, pathology work, and medical AI gradually pulled me toward robotics.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/how-i-moved-from-biomedical-engineering-into-robotic-surgery-research/";
          
        },
      },{id: "post-from-medical-image-segmentation-to-usable-geometry-why-meshes-matter",
        
          title: "from medical image segmentation to usable geometry: why meshes matter",
        
        description: "Why a segmentation mask is often only the middle of the pipeline, not the end of it.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/from-medical-image-segmentation-to-usable-geometry-why-meshes-matter/";
          
        },
      },{id: "post-what-course-projects-taught-me-that-research-papers-did-not",
        
          title: "what course projects taught me that research papers did not",
        
        description: "A few things that only really sink in once you try to make the method run yourself.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/what-course-projects-taught-me-that-research-papers-did-not/";
          
        },
      },{id: "post-what-sparse-view-clinical-reconstruction-teaches-you-about-real-world-3d-vision",
        
          title: "what sparse-view clinical reconstruction teaches you about real-world 3d vision",
        
        description: "Why sparse clinical imaging is a very good way to stop romanticizing 3D vision.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/what-sparse-view-clinical-reconstruction-teaches-you-about-real-world-3d-vision/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-embarking-on-my-first-ta-position-for-applied-deep-learning-at-carnegie-mellon-university",
          title: 'Embarking on my first TA position, for Applied Deep Learning at Carnegie Mellon...',
          description: "",
          section: "News",},{id: "news-starting-off-the-semester-as-a-teaching-assistant-for-dr-jason-szafron-s-graduate-course-fundamentals-of-computational-biomedical-engineering-and-my-thesis-guide-dr-kenji-shimada-s-computer-vision",
          title: 'Starting off the semester as a Teaching Assistant for Dr. Jason Szafron’s graduate...',
          description: "",
          section: "News",},{id: "news-began-serving-as-a-teaching-assistant-for-professor-newell-washburn-s-course-machine-learning-applications-in-experimental-biomedical-research-at-carnegie-mellon-university-a-full-circle-moment-since-i-took-the-course-myself-in-spring-2025",
          title: 'Began serving as a Teaching Assistant for Professor Newell Washburn’s course, Machine Learning...',
          description: "",
          section: "News",},{id: "news-i-will-be-spending-my-summer-as-a-researcher-at-surreality-lab-with-rishi-basdeo-and-pis-professor-edward-andrews-and-professor-jacob-biehl",
          title: 'I will be spending my summer as a researcher at Surreality Lab with...',
          description: "",
          section: "News",},{id: "projects-neural-anisotropic-diffusion-for-medical-image-relaxation",
          title: 'Neural Anisotropic Diffusion for Medical Image Relaxation',
          description: "Course project for Medical Image Analysis",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_project/";
            },},{id: "projects-neural-active-contours",
          title: 'Neural Active Contours',
          description: "A non U-Net segmentation approach for medical images",
          section: "Projects",handler: () => {
              window.location.href = "/projects/11_project/";
            },},{id: "projects-full-volume-lung-ct-segmentation-and-surface-export",
          title: 'Full-Volume Lung CT Segmentation and Surface Export',
          description: "A real-data MONAI and VTK pipeline that segments full chest CT volumes, exports lung surfaces, and reports validation metrics for navigation-prep experiments.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/12_project/";
            },},{id: "projects-deformable-3d-surgical-scene-reconstruction",
          title: 'Deformable 3D Surgical Scene Reconstruction',
          description: "A surgical vision prototype that combines depth-based point clouds, deformable 3D Gaussian splatting, and VLM-guided semantic querying for endoscopic scenes.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/13_project/";
            },},{id: "projects-neural-morphological-analysis-of-fungi",
          title: 'Neural Morphological Analysis of Fungi',
          description: "A microscopy project for fungal species classification and future neural-field modeling of morphology from high-resolution biological image patches.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/14_project/";
            },},{id: "projects-skin-lesion-segmentation-on-isic-2018",
          title: 'Skin Lesion Segmentation on ISIC 2018',
          description: "A reproducible dermoscopy segmentation benchmark with DeepLabV3 baselines, planned U-Net and transformer comparisons, and promptable SAM-style extensions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/15_project/";
            },},{id: "projects-open-vocabulary-surgical-tool-detection-and-tracking",
          title: 'Open-Vocabulary Surgical Tool Detection and Tracking',
          description: "A real endoscopy pipeline that turns text prompts into surgical tool boxes, masks, tracking overlays, and evaluation metrics using Grounding DINO and SAM2.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/16_project/";
            },},{id: "projects-gaussian-occupancy-cardiac-reconstruction",
          title: 'Gaussian Occupancy Cardiac Reconstruction',
          description: "A sparse-view echocardiography project that recovers 3D cardiac anatomy with Gaussian occupancy fields, differentiable slice supervision, and mesh evaluation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/17_project/";
            },},{id: "projects-sparse-view-coronary-vessel-reconstruction",
          title: 'Sparse-View Coronary Vessel Reconstruction',
          description: "A research prototype for recovering 3D coronary vessel geometry from limited angiographic projections using differentiable rendering and hemodynamic constraints.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/18_project/";
            },},{id: "projects-multi-scale-lung-histopathology-classification",
          title: 'Multi-Scale Lung Histopathology Classification',
          description: "A pathology model that fuses 20x and 40x whole-slide image views with cross-scale attention for malignancy, subtype, and differentiation grading.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/19_project/";
            },},{id: "projects-physics-informed-endovasculature-deformation-estimation-and-registration",
          title: 'Physics-Informed Endovasculature Deformation Estimation And Registration',
          description: "Research at CERLAB (master&#39;s thesis)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-federated-graph-learning-for-pathology-images",
          title: 'Federated Graph Learning for Pathology Images',
          description: "A pathology learning pipeline that combines self-supervised image encoding, patient-level federated training, graph reasoning, and concept-bottleneck classification.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/20_project/";
            },},{id: "projects-spatiotemporal-glioblastoma-evolution-visual-prediction",
          title: 'Spatiotemporal Glioblastoma Evolution Visual Prediction',
          description: "Research at The ∀ Lab &amp; Image Science Lab",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-neural-correlates-associated-to-images-for-emtional-response",
          title: 'Neural Correlates Associated to Images for Emtional Response',
          description: "Course Project for Fundamentals of MRI and Neuroimaging Analysis",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-few-shot-2d-echo-to-3d-cardiac-reconstruction-via-neural-implicit-priors",
          title: 'Few-Shot 2D Echo to 3D Cardiac Reconstruction via Neural Implicit Priors',
          description: "Course Project for Learning for 3D Vision",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-multi-model-oral-squamous-cell-carcinoma-detection",
          title: 'Multi-Model Oral Squamous Cell Carcinoma Detection',
          description: "Undergraduate thesis",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-lung-amp-colon-cancer-detection-using-histopathological-imaging",
          title: 'Lung &amp;amp; Colon cancer detection using Histopathological Imaging',
          description: "Research at Biomedical Computing Lab",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-monkeypox-virus-detection-using-skin-lesion-images",
          title: 'Monkeypox Virus Detection Using Skin Lesion Images',
          description: "Prelimnary project at Biomedical Computing Lab",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-cta-to-mesh-amp-point-cloud-coronary-artery-segmentation-using-residual-3d-u-net",
          title: 'CTA to Mesh &amp;amp; Point-Cloud Coronary Artery Segmentation using Residual 3D U-Net',
          description: "Course Project for Image Based Computational Modelling &amp; Analysis",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-attention-augmented-dual-view-mammogram-alignment-for-enhanced-bi-rads-classification",
          title: 'Attention-augmented Dual-View Mammogram Alignment for Enhanced BI-RADS Classification',
          description: "Course project for Projects in Biomedical AI",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%74%75%73%68%61%72@%61%6E%64%72%65%77.%63%6D%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/tushar-nayak", "_blank");
        },
      },{
        id: 'social-ieee',
        title: 'IEEE Xplore',
        section: 'Socials',
        handler: () => {
          window.open("https://ieeexplore.ieee.org/author/37089961991/", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/nayaktushar", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000000243287983", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Tushar-Nayak-3/", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=9xUX7NoAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
