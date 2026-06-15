# Tushar Nayak

Personal academic website and project portfolio for [tushar-nayak.github.io](https://tushar-nayak.github.io/).

This site is built with [Jekyll](https://jekyllrb.com/) on top of the [al-folio](https://github.com/alshedivat/al-folio) theme, with custom project pages, featured work, and a homepage research map.

## Local development

### Recommended: Docker

```bash
./bin/preview
```

or directly:

```bash
docker compose up
```

The site will be available at `http://localhost:8080`.

### Native Ruby setup

This repo currently expects a modern Ruby/Bundler setup. If you want to run it natively, use:

- Ruby `>= 3.1`
- Bundler `2.6.9`
- Homebrew Ruby on macOS is supported by the repo scripts via `bin/setup-ruby-env`

Then install dependencies and serve:

```bash
source bin/setup-ruby-env
bundle install
bundle exec jekyll serve
```

To run a production-style local build:

```bash
./bin/cibuild
```

## Formatting

Prettier is used for Liquid, Markdown, and related frontend files.

Check formatting:

```bash
npx prettier . --check
```

Write formatting fixes:

```bash
npx prettier . --write
```

## Where things live

- `_pages/`: top-level pages such as home, projects, publications, CV
- `_projects/`: individual project pages and project metadata
- `_includes/`: reusable Liquid partials
- `_layouts/`: page layouts
- `_sass/`: site styling
- `assets/`: images, PDFs, JS, CSS, and project thumbnails

## Project content

Projects are managed as a Jekyll collection in `_projects/`.

Useful front matter fields include:

- `title`
- `description`
- `img`
- `importance`
- `category`
- `github`
- `website`
- `report`
- `status`
- `tags`
- `featured`

Custom project UI is driven by:

- `_includes/project_meta.liquid`
- `_includes/project_links.liquid`
- `_includes/featured_projects.liquid`
- `_includes/research_map.liquid`

## Deployment

The production site is served from GitHub Pages at:

<https://tushar-nayak.github.io/>

## Notes

- This repo is customized from `al-folio`; the upstream README does not describe the current site accurately.
- If local Ruby setup fails, prefer Docker first. It is the simpler path for this repo.
