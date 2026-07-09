# tut-v-ssg: Vue + Vite Static Site Generation

This project is an exploration of modern Static Site Generation (SSG) using Vue 3, Vite, and `vite-ssg`. It demonstrates how to pre-render a Vue application into static HTML files for maximum performance and perfect SEO, while retaining full client-side reactivity.

## 🚀 How SSG Works in This Project

Unlike a standard Single Page Application (SPA) where the browser downloads a blank HTML file and waits for JavaScript to build the UI, this project uses **Static Site Generation**.

During the build process (`npm run build`):

1. `vite-ssg` spins up a headless Node.js environment.
2. It executes our Vue application and visits every route defined in `main.ts`.
3. It takes a "snapshot" of the fully rendered UI for each route and saves them as physical `.html` files (e.g., `dist/index.html`, `dist/about.html`).

When a user visits the site, the browser downloads fully-formed HTML and paints the screen instantly. In the background, Vue downloads the JavaScript bundle and silently "hydrates" the static HTML, turning it back into a fully interactive, reactive application.

## 🎨 CSS Styling & Beasties

This project utilizes a specific pipeline for handling CSS to optimize the First Contentful Paint (FCP) on small-to-medium sites.

1. **Vite Configuration:** We have disabled CSS code splitting (`cssCodeSplit: false`). Vite compiles all CSS across the entire application into a single asset.
2. **Beasties Injection:** We use `beasties` (the modern successor to `critters`) via `vite-ssg` to intercept the generated HTML files. Because our total CSS is under the configured threshold (90kb), `beasties` takes the compiled CSS and injects it entirely into a `<style>` tag inside the `<head>` of every `.html` file, completely removing the external `<link rel="stylesheet">` tag.

> **⚠️ Architecture Note:** > Forcing 100% of the app's CSS into the HTML `<head>` eliminates a network request, making the initial load blazing fast for this project. However, **this is not a best practice for massive applications.** For large-scale apps, CSS should usually remain in external `.css` files so the browser can cache them across different pages and sessions. We are intentionally breaking that rule here to demonstrate how the inlining engine works!

## 💻 Running the Project

### Setup

Ensure you are using Node.js v22+ or v24+.

```bash
npm install
```

### Local Development

Start the standard Vite development server with Hot Module Replacement (HMR).

```bash
npm run dev
```

### Build & Preview (SSG)

To compile the static site and see the `vite-ssg` and `beasties` pipeline in action:

```bash
# Builds the static HTML files into the /dist folder
npm run build

# Preview the compiled static site locally
npm run preview
```
