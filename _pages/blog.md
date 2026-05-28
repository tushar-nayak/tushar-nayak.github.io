---
layout: default
permalink: /blog/
title: blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 10
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

<div class="post">

{% assign blog_name_size = site.blog_name | size %}
{% assign blog_description_size = site.blog_description | size %}

{% if blog_name_size > 0 or blog_description_size > 0 %}

  <div class="header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h2>{{ site.blog_description }}</h2>
  </div>
  {% endif %}

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" | reverse %}
{% assign month_names = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec" | split: "," %}
{% if posts_by_year.size > 0 %}

  <section class="blog-calendar">
    <div class="blog-calendar__header">
      <div>
        <h3>publishing calendar</h3>
        <p>click a month to filter the blog list.</p>
      </div>
      <button class="blog-calendar__reset" type="button" data-blog-filter-reset>show all</button>
    </div>
    <div class="blog-calendar__years">
      {% for year_group in posts_by_year %}
        <div class="blog-calendar__year">
          <a class="blog-calendar__year-link" href="{{ year_group.name | prepend: '/blog/' | relative_url }}">{{ year_group.name }}</a>
          <div class="blog-calendar__months">
            {% for month_num in (1..12) %}
              {% capture month_key %}{% if month_num < 10 %}0{% endif %}{{ month_num }}{% endcapture %}
              {% assign post_count = 0 %}
              {% for post in year_group.items %}
                {% assign post_month = post.date | date: '%m' %}
                {% if post_month == month_key %}
                  {% assign post_count = post_count | plus: 1 %}
                {% endif %}
              {% endfor %}
              {% capture filter_key %}{{ year_group.name }}-{{ month_key }}{% endcapture %}
              <button
                class="blog-calendar__month{% if post_count > 0 %} blog-calendar__month--active{% endif %}"
                type="button"
                {% if post_count > 0 %}
                  data-blog-filter="{{ filter_key }}"
                {% else %}
                  disabled
                {% endif %}
              >
                <span class="blog-calendar__month-label">{{ month_names[forloop.index0] }}</span>
                <span class="blog-calendar__month-count">{{ post_count }}</span>
              </button>
            {% endfor %}
          </div>
        </div>
      {% endfor %}
    </div>
    <p class="blog-calendar__active-filter" data-blog-filter-label hidden></p>
  </section>
{% endif %}

{% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}

  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in site.display_tags %}
        <li>
          <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
      {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.display_categories %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i> <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">{{ category }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
    </ul>
  </div>
  {% endif %}

{% assign featured_posts = site.posts | where: "featured", "true" %}
{% if featured_posts.size > 0 %}
<br>

<div class="container featured-posts" data-featured-posts>
{% assign is_even = featured_posts.size | modulo: 2 %}
<div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
{% for post in featured_posts %}
<div class="col mb-4">
<a href="{{ post.url | relative_url }}">
<div class="card hoverable">
<div class="row g-0">
<div class="col-md-12">
<div class="card-body">
<div class="float-right">
<i class="fa-solid fa-thumbtack fa-xs"></i>
</div>
<h3 class="card-title text-lowercase">{{ post.title }}</h3>
<p class="card-text">{{ post.description }}</p>

                    {% if post.external_source == blank %}
                      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                    {% else %}
                      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                    {% endif %}
                    {% assign year = post.date | date: "%Y" %}

                    <p class="post-meta">
                      {{ read_time }} min read &nbsp; &middot; &nbsp;
                      <a href="{{ year | prepend: '/blog/' | relative_url }}">
                        <i class="fa-solid fa-calendar fa-sm"></i> {{ year }} </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      {% endfor %}
      </div>
    </div>
    <hr>

{% endif %}

  <ul class="post-list" data-blog-post-list>

    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}

    {% if post.external_source == blank %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% else %}
      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
    {% endif %}
    {% assign year = post.date | date: "%Y" %}
    {% assign month = post.date | date: "%m" %}
    {% assign tags = post.tags | join: "" %}
    {% assign categories = post.categories | join: "" %}

    <li data-post-month="{{ year }}-{{ month }}">

{% if post.thumbnail %}

<div class="row">
          <div class="col-sm-9">
{% endif %}
        <h3>
        {% if post.redirect == blank %}
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% elsif post.redirect contains '://' %}
          <a class="post-title" href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
          <svg width="2rem" height="2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        {% else %}
          <a class="post-title" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
        {% endif %}
      </h3>
      <p>{{ post.description }}</p>
      <p class="post-meta">
        {{ read_time }} min read &nbsp; &middot; &nbsp;
        {{ post.date | date: '%B %d, %Y' }}
        {% if post.external_source %}
        &nbsp; &middot; &nbsp; {{ post.external_source }}
        {% endif %}
      </p>
      <p class="post-tags post-tags-index">
        <span class="post-meta-year">
          <a href="{{ year | prepend: '/blog/' | relative_url }}">
            <i class="fa-solid fa-calendar fa-sm"></i> {{ year }}
          </a>
        </span>

        {% assign visible_categories = post.categories | where_exp: "category", "category != 'research'" %}

        {% if tags != "" or visible_categories.size > 0 %}
          <span class="post-tags-separator">&middot;</span>
        {% endif %}

        {% if tags != "" %}
          <span class="post-tag-pills">
            {% for tag in post.tags limit: 3 %}
              <a class="post-tag-pill" href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">
                {{ tag }}
              </a>
            {% endfor %}
          </span>
        {% endif %}

        {% if visible_categories.size > 0 %}
          <span class="post-tags-separator">&middot;</span>
          <span class="post-tag-pills post-category-pills">
            {% for category in visible_categories %}
              <a class="post-tag-pill post-category-pill" href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">
                {{ category }}
              </a>
            {% endfor %}
          </span>
        {% endif %}
      </p>

{% if post.thumbnail %}

</div>

  <div class="col-sm-3">
    <img class="card-img" src="{{ post.thumbnail | relative_url }}" style="object-fit: cover; height: 90%" alt="image">
  </div>
</div>
{% endif %}
    </li>

    {% endfor %}

  </ul>

{% if page.pagination.enabled %}
{% include pagination.liquid %}
{% endif %}

</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = Array.from(document.querySelectorAll("[data-blog-filter]"));
    const resetButton = document.querySelector("[data-blog-filter-reset]");
    const filterLabel = document.querySelector("[data-blog-filter-label]");
    const posts = Array.from(document.querySelectorAll("[data-post-month]"));
    const featuredPosts = document.querySelector("[data-featured-posts]");
    const pagination = document.querySelector(".pagination");

    if (!filterButtons.length || !posts.length) return;

    function setFilter(monthKey, labelText) {
      let visibleCount = 0;

      posts.forEach(function (post) {
        const isMatch = !monthKey || post.dataset.postMonth === monthKey;
        post.hidden = !isMatch;
        if (isMatch) visibleCount += 1;
      });

      filterButtons.forEach(function (button) {
        button.classList.toggle("blog-calendar__month--selected", button.dataset.blogFilter === monthKey);
      });

      if (featuredPosts) featuredPosts.hidden = Boolean(monthKey);
      if (pagination) pagination.hidden = Boolean(monthKey);

      if (filterLabel) {
        if (monthKey) {
          filterLabel.hidden = false;
          filterLabel.textContent = labelText + " · " + visibleCount + " post" + (visibleCount === 1 ? "" : "s");
        } else {
          filterLabel.hidden = true;
          filterLabel.textContent = "";
        }
      }
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setFilter(button.dataset.blogFilter, button.querySelector(".blog-calendar__month-label").textContent + " " + button.closest(".blog-calendar__year").querySelector(".blog-calendar__year-link").textContent);
      });
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        setFilter("", "");
      });
    }
  });
</script>
