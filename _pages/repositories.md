---
layout: page
permalink: /repositories/
title: repositories
description: Selected GitHub repositories and codebases.
nav: true
nav_order: 5
---

This page collects the main public repositories behind my project work, experiments, and website.
For a broader project overview with descriptions and results, see the [projects](/projects/) page.

<p>
  <a class="btn btn-sm z-depth-0" href="https://github.com/tushar-nayak" role="button" target="_blank" rel="noopener noreferrer">
    <i class="fa-brands fa-github"></i>
    <span>View GitHub Profile</span>
  </a>
</p>

{% if site.data.repositories.github_users %}

  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center mb-4">
    {% for user in site.data.repositories.github_users %}
      {% include repository/repo_user.liquid username=user %}
    {% endfor %}
  </div>
{% endif %}

{% if site.data.repositories.github_repos %}

  <h2>Selected repositories</h2>

  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% for repo in site.data.repositories.github_repos %}
      {% include repository/repo.liquid repository=repo %}
    {% endfor %}
  </div>
{% endif %}
