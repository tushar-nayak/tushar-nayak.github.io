---
layout: post
title: "deformable endoscopic scene reconstruction: where current 3d methods break"
date: 2026-05-06 10:00:00
description: Why endoscopy is a difficult place for 3D reconstruction methods that assume the world stays still.
tags: endoscopy 3d-reconstruction deformation surgical-vision robotics
categories: research
featured_project: 13_project.md
---

Endoscopic scene reconstruction looks like a natural home for modern 3D vision until you remember that the scene is alive.

The camera moves. The tissue moves. The lighting changes. Tools enter the frame. Specular highlights appear. Fluids change the appearance. The surface deforms when touched. The world does not behave like a nice static scene waiting to be reconstructed.

That is where a lot of current 3D methods start to break.

## Static-scene assumptions do not survive surgery

Many 3D reconstruction methods work best when the scene is mostly rigid and the camera motion is the main thing to estimate. That assumption is already fragile in everyday videos. In surgery, it is often just false.

Soft tissue bends, stretches, compresses, and slides. The camera viewpoint changes, but the anatomy is also changing at the same time. If the method explains everything as camera motion, the reconstruction starts accumulating lies. If it explains everything as deformation, pose becomes unstable. The two errors feed each other.

This is why endoscopic reconstruction is not just SLAM with a medical camera. The object being mapped is changing while you map it.

## Appearance is not reliable enough

Endoscopy also makes appearance-based matching difficult.

Specular highlights move with viewpoint and lighting. Texture can be weak or repetitive. Smoke and fluid can corrupt the frame. Tools create occlusions exactly where the interesting interaction is happening. The surface may look different before and after contact even if it is the same anatomy.

So feature matching, photometric consistency, and dense correspondence all become less trustworthy than they look in a standard demo.

## Deformation is the missing variable

The real problem is that the reconstruction needs to account for deformation explicitly.

If the tissue is pulled, pressed, or inflated, the geometry changes. A good model should not simply smear that change into camera pose or depth noise. It should represent the surface as something that can deform while still obeying reasonable physical constraints.

That is hard because the image does not directly tell you the full deformation field. It only shows a visible surface under difficult imaging conditions.

## The failure that worries me most

The failure mode I find most interesting is not when reconstruction completely collapses. It is when it looks plausible while becoming inconsistent.

A surface can look smooth but drift over time. A depth map can look locally reasonable but fail to preserve anatomy. A neural representation can render convincing frames while hiding geometry that would not be useful for navigation. A Gaussian or implicit scene can optimize the image loss while becoming physically strange.

That is the danger of using rendering quality as the main proof. Good rendering does not automatically mean good geometry.

## Why this keeps pulling me in

My own interest here comes from deformable reconstruction more broadly: how to estimate anatomy when sparse, partial images are all you have and the structure does not stay rigid.

Endoscopy is a harsher version of that same problem. Instead of a clean preoperative volume and a projection, you get a moving camera and a changing surface. But the core issue is familiar: image evidence is incomplete, and the model needs a physically sensible way to fill in what the image cannot determine.

## The honest framing

Current 3D methods are powerful, but many of them still inherit assumptions that surgery violates.

If the method only optimizes appearance, it can produce geometry that looks right but is not usable. If it assumes rigidity, it will misinterpret tissue motion. If it ignores tools, it will treat interaction as a visual nuisance instead of the cause of deformation.

For surgical use, reconstruction has to care about the physical scene, not just the rendered view.

## What a better system would have to admit

A better endoscopic reconstruction system should probably combine visual reconstruction with deformation-aware priors, tool interaction cues, temporal consistency, and uncertainty.

I would also evaluate it differently. Not only novel-view rendering quality, but surface accuracy, temporal drift, deformation plausibility, and whether the geometry remains useful for downstream guidance.

That would make the problem much harder. But endoscopy is already hard. The benchmark should admit that.
