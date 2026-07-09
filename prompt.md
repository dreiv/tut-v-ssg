## .oxfmtrc.json

```
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "semi": false,
  "singleQuote": true
}

```

---

## env.d.ts

```
/// <reference types="vite/client" />

```

---

## index.html

```
<!doctype html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="src/main.ts"></script>
  </body>
</html>

```

---

## package.json

```
{
  "name": "tut-v-ssg",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite-ssg build",
    "type-check": "vue-tsc --build",
    "format": "oxfmt src/"
  },
  "dependencies": {
    "vue": "beta"
  },
  "devDependencies": {
    "@tsconfig/node24": "^24.0.4",
    "@types/node": "^24.13.2",
    "@vitejs/plugin-vue": "^6.0.7",
    "@vue/server-renderer": "beta",
    "@vue/tsconfig": "^0.9.1",
    "critters": "^0.0.23",
    "npm-run-all2": "^9.0.2",
    "oxfmt": "^0.54.0",
    "typescript": "~6.0.0",
    "vite": "^8.0.16",
    "vite-plugin-vue-devtools": "^8.1.2",
    "vite-ssg": "latest",
    "vue-tsc": "^3.3.5"
  },
  "engines": {
    "node": "^22.18.0 || >=24.12.0"
  },
  "overrides": {
    "vue": "beta",
    "@vue/compiler-core": "beta",
    "@vue/compiler-dom": "beta",
    "@vue/compiler-sfc": "beta",
    "@vue/compiler-ssr": "beta",
    "@vue/compiler-vapor": "beta",
    "@vue/reactivity": "beta",
    "@vue/runtime-core": "beta",
    "@vue/runtime-dom": "beta",
    "@vue/runtime-vapor": "beta",
    "@vue/server-renderer": "beta",
    "@vue/shared": "beta",
    "@vue/compat": "beta"
  }
}

```

---

## src/App.vue

```
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// --- STATIC DATA ---
// This data will be compiled directly into the raw index.html at build time.
const techStack = [
  { name: 'Vue (Beta)', desc: 'The progressive, highly-optimized JavaScript framework.' },
  { name: 'Vite 8', desc: 'Lightning-fast next-generation frontend tooling.' },
  { name: 'Vite SSG', desc: 'Robust server-side generation for single-page apps.' },
  { name: 'TypeScript', desc: 'Strict typing for a bulletproof developer experience.' }
]

const benefits = [
  '⚡️ Instant First Contentful Paint (FCP)',
  '🔍 Perfect SEO because crawlers read fully-formed HTML',
  '💧 Seamless hydration once the JS bundle downloads',
  '🔒 No direct database exposure on the client side'
]

// --- INTERACTIVE DATA ---
// This data only comes alive after the browser downloads the JS and Vue "hydrates" the page.
const clickCount = ref(0)
const isHydrated = ref(false)
const userName = ref('')

// The onMounted hook is ignored by vite-ssg during the Node build.
// It ONLY fires in the user's browser once the app is alive.
onMounted(() => {
  isHydrated.value = true
})

const greetingMessage = computed(() => {
  if (!isHydrated.value) return 'Waiting for JavaScript to wake up...'

  const name = userName.value.trim() ? userName.value : 'Anonymous Explorer'
  return clickCount.value > 0
    ? `Great job, ${name}! You've interacted ${clickCount.value} times.`
    : `Welcome, ${name}! Click the button to test reactivity.`
})

function triggerReactivity() {
  clickCount.value++
}
</script>

<template>
  <div class="app-wrapper">
    <header class="hero-section">
      <h1>Modern SSG Architecture 🚀</h1>
      <p class="subtitle">
        This entire page structure is pre-rendered into a static HTML file at build time.
        Your browser paints the UI instantly, and Vue silently takes control in the background.
      </p>
    </header>

    <main class="grid-container">
      <section class="card static-card">
        <h2>Why Use SSG?</h2>
        <ul class="benefit-list">
          <li v-for="(benefit, index) in benefits" :key="index">
            {{ benefit }}
          </li>
        </ul>
      </section>

      <section class="card static-card">
        <h2>The 2026 Stack</h2>
        <div class="stack-grid">
          <div v-for="tech in techStack" :key="tech.name" class="tech-item">
            <h3>{{ tech.name }}</h3>
            <p>{{ tech.desc }}</p>
          </div>
        </div>
      </section>

      <section class="card interactive-card" :class="{ 'fully-hydrated': isHydrated }">
        <div class="card-header">
          <h2>Hydration Playground</h2>
          <span class="status-badge" :class="isHydrated ? 'active' : 'pending'">
            {{ isHydrated ? 'Hydrated 💧' : 'Static 🧊' }}
          </span>
        </div>

        <p class="reaction-text">{{ greetingMessage }}</p>

        <div class="interaction-controls">
          <input
            v-model="userName"
            type="text"
            placeholder="Type your name..."
            class="name-input"
            :disabled="!isHydrated"
          />
          <button
            @click="triggerReactivity"
            class="action-button"
            :disabled="!isHydrated"
          >
            Trigger Reactivity (+1)
          </button>
        </div>
      </section>
    </main>

    <footer class="app-footer">
      <p>Built with Vite SSG • Fully Static • Fully Reactive</p>
    </footer>
  </div>
</template>

<style scoped>
/* --- BASE LAYOUT --- */
.app-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
  line-height: 1.5;
}

/* --- HERO SECTION --- */
.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #42b883;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
}

/* --- GRID & CARDS --- */
.grid-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.card h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

/* --- STATIC STYLES --- */
.benefit-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  font-weight: 500;
}

.benefit-list li:last-child {
  border-bottom: none;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.tech-item h3 {
  font-size: 1.1rem;
  color: #34495e;
  margin: 0 0 0.5rem 0;
}

.tech-item p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

/* --- INTERACTIVE STYLES --- */
.interactive-card {
  background: #f8fafc;
  border-color: #cbd5e1;
  transition: all 0.3s ease;
}

.interactive-card.fully-hydrated {
  background: #f0fdf4;
  border-color: #86efac;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h2 {
  margin-bottom: 0;
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.pending {
  background-color: #e2e8f0;
  color: #64748b;
}

.status-badge.active {
  background-color: #42b883;
  color: white;
}

.reaction-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 1.5rem;
  min-height: 1.5rem;
}

.interaction-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.name-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
}

.name-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.action-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button:hover:not(:disabled) {
  background-color: #33a06f;
}

.action-button:disabled, .name-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* --- FOOTER --- */
.app-footer {
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #eaeaea;
  color: #999;
  font-size: 0.9rem;
}
</style>

```

---

## src/main.ts

```
import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";

export const createApp = ViteSSG(App);

```

---

## tsconfig.app.json

```
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    // Extra safety for array and object lookups, but may have false positives.
    "noUncheckedIndexedAccess": true,

    // Path mapping for cleaner imports.
    "paths": {
      "@/*": ["./src/*"]
    },

    // `vue-tsc --build` produces a .tsbuildinfo file for incremental type-checking.
    // Specified here to keep it out of the root directory.
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo"
  }
}

```

---

## tsconfig.json

```
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    }
  ]
}

```

---

## tsconfig.node.json

```
// TSConfig for modules that run in Node.js environment via either transpilation or type-stripping.
{
  "extends": "@tsconfig/node24/tsconfig.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "playwright.config.*",
    "eslint.config.*"
  ],
  "compilerOptions": {
    // Most tools use transpilation instead of Node.js's native type-stripping.
    // Bundler mode provides a smoother developer experience.
    "module": "preserve",
    "moduleResolution": "bundler",

    // Include Node.js types and avoid accidentally including other `@types/*` packages.
    "types": ["node"],

    // Disable emitting output during `vue-tsc --build`, which is used for type-checking only.
    "noEmit": true,

    // `vue-tsc --build` produces a .tsbuildinfo file for incremental type-checking.
    // Specified here to keep it out of the root directory.
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
  }
}

```

---

## vite.config.ts

```
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import type { ViteSSGOptions } from "vite-ssg";

// https://vite.dev/config/
export default defineConfig({
  base: "/tut-v-ssg/",
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssgOptions: {
    formatting: "minify",
    crittersOptions: {
      reduceInlineStyles: false,
      preload: "swap",
      publicPath: "/tut-v-ssg/",
    },
  } as ViteSSGOptions,
});

```

---

