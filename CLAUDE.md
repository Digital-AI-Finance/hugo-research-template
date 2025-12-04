# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based research project website template designed for GitHub Pages deployment via GitHub Actions. It features a fixed left sidebar navigation with responsive design.

## Local Development

```powershell
# Serve locally with live reload
hugo server -D

# Build for production
hugo --minify
```

The site is served at `http://localhost:1313/` by default.

## Architecture

### Layout Structure
- `layouts/_default/baseof.html` - Base template with sidebar, footer, smooth scroll JS
- `layouts/index.html` - Homepage content using Hugo template syntax
- `hugo.toml` - Hugo configuration (baseURL, title, params)
- `content/_index.md` - Homepage metadata

### Styling System
All styles in `static/css/style.css` use CSS custom properties:
- `--primary-color` / `--primary-light` - Brand colors (gray default)
- `--accent-color` / `--accent-light` - Highlight colors (purple default)
- `--sidebar-width` - Fixed at 140px

### Hugo Template Syntax
- `{{ .Site.Title }}` - Access site title from hugo.toml
- `{{ .Site.Params.description }}` - Access custom params
- `{{ "css/style.css" | relURL }}` - Generate relative URLs
- `{{ define "main" }}...{{ end }}` - Define content blocks
- `{{ block "main" . }}{{ end }}` - Include content blocks

### Section Types and Grid Layouts
| Section | Grid Columns | CSS Class |
|---------|--------------|-----------|
| About | 3 | `.about-grid` |
| Team | 8 | `.team-grid` |
| Stats/Output | 6 | `.stats-grid` |
| Publications | 2 | `.publications-grid` |
| Events | 2 | `.events-grid` |
| Collaborations | 3 | `.collaborations-grid` |
| Funding | 3 | `.funding-grid` |
| Partners | 6 | `.partners-grid` |

## GitHub Pages Deployment

Requires GitHub Actions workflow (`.github/workflows/hugo.yml`) because GitHub Pages does not natively support Hugo. The workflow:
1. Installs Hugo Extended
2. Builds site with `hugo --minify`
3. Deploys `public/` folder to GitHub Pages

## Key Customization Points

1. **Site Config**: Edit `hugo.toml` for title, description, params
2. **Colors**: Edit CSS variables in `static/css/style.css`
3. **Navigation**: Edit sidebar in `layouts/_default/baseof.html`
4. **Content**: Edit sections in `layouts/index.html`
