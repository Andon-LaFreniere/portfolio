# Andon Portfolio

A dark, minimal portfolio built with Vite, TypeScript, Three.js, and plain CSS. The fixed point-cloud hero uses deterministic IFS / chaos-game generators and a vertex-shader morph between four geometric fractals.

## Development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production preview:

```bash
npm run build
npm run preview
```

The build currently emits approximately 122 kB gzip for JavaScript and 2 kB gzip for CSS. Three.js is intentionally kept as the only runtime dependency.

## Structure

```text
src/
  content/content.ts       Typed portfolio copy and TODO placeholders
  fractals/generators.ts   Deterministic chaos-game point clouds
  scene.ts                 Three.js renderer and morph shaders
  scroll.ts                Smooth scroll dimming and nav state
  styles/main.css          Layout, responsive styles, and motion rules
  main.ts                  Semantic page renderer and observers
```

Edit `src/content/content.ts` to replace the clearly marked links, dates, coursework, bullets, and identity fields. The layout does not need to change for normal copy updates.

## Deployment

### Vercel

Import the repository in Vercel. Use `npm run build` as the build command and `dist` as the output directory. Vercel detects Vite automatically for most projects.

### Cloudflare Pages

Create a Pages project from the repository. Use `npm run build` as the build command and `dist` as the build output directory.

## Accessibility and performance

The scene caps device pixel ratio at 2, pauses its render work while the document is hidden, disposes GPU resources on teardown, falls back to cyan SVG line art when WebGL is unavailable, and honors `prefers-reduced-motion`. Content remains semantic and usable without the canvas.
