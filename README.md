# ITZFIZZ — Scroll-Driven Hero Section Animation

A scroll-driven interactive hero section and automotive showcase built with **React**, **TypeScript**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

---

## Live Links

- **Public / Shareable App URL:** [https://ais-pre-dl6bznyaw6suctye4gbgxj-284446791353.asia-southeast1.run.app](https://ais-pre-dl6bznyaw6suctye4gbgxj-284446791353.asia-southeast1.run.app)
- **Development Preview URL:** [https://ais-dev-dl6bznyaw6suctye4gbgxj-284446791353.asia-southeast1.run.app](https://ais-dev-dl6bznyaw6suctye4gbgxj-284446791353.asia-southeast1.run.app)
- **Reference Inspiration:** [https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## Project Overview

This project recreates and enhances a scroll-driven hero animation where the central vehicle visual is controlled directly by the user's scroll position rather than a time-based autoplay loop.

### Core Highlights

1. **Full-Screen Pinned Hero Section (`Hero.tsx`)**
   - Occupies the initial viewport (`100dvh`) with a letter-spaced headline: **`W E L C O M E   I T Z F I Z Z`**.
   - Displays four impact statistics below the central runway:
     - **85%** — Customer Satisfaction
     - **92%** — Project Success
     - **78%** — Growth
     - **95%** — Client Retention
   - Includes an interactive preset switcher to also inspect the reference **58% / 23%** mobility dispatch statistics.

2. **Initial Page-Load Animation**
   - Uses a scoped GSAP timeline (`gsap.context()`) on initial mount.
   - Smoothly fades and lifts the headline characters with a staggered reveal.
   - Animates the central vehicle and the four statistic cards into view sequentially with subtle delays.

3. **Scroll-Driven Animation (`ScrollVisual.tsx`)**
   - Powered by **GSAP `ScrollTrigger`** with smooth scrub interpolation (`scrub: 0.6`, `pin: true`, `invalidateOnRefresh: true`).
   - **Scroll Down (`0% → 50% → 100%`)**: Translates the vehicle horizontally across the runway, applies subtle vertical lift, scale, and pitch rotation, deploys the active rear wing, rotates both front and rear 10-spoke wheels (`0° → 720°`), illuminates the headline characters progressively, and fills the runway and statistic progress bars.
   - **Scroll Up (`100% → 0%`)**: Naturally reverses all vehicle movement, wheel rotation, and progress indicators in lockstep with the scrollbar.
   - **Stop Behavior**: Settles accurately at the exact scroll position whenever scrolling stops.

4. **Performance & GPU Optimization**
   - Animates strictly GPU-composited properties (`translate3d`, `scale`, `rotate`, `opacity`) with `force3D: true`.
   - Zero React state updates (`useState`) occur during scroll events, preventing component re-renders and layout thrashing.
   - Runway travel bounds are cached inside `onRefreshInit` to avoid layout reads (`clientWidth`) during scroll ticks.

5. **Responsive Design**
   - Adapts smoothly across Desktop, Laptop, Tablet, and Mobile screens.
   - Automatically recalculates horizontal travel distance on window resize so the vehicle never overflows horizontally or obscures text.

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP 3 (`gsap` + `ScrollTrigger`)
- **Typography:** `Syne` (Display), `Plus Jakarta Sans` (Body), `JetBrains Mono` (Tabular Numerals)

---

## Project Structure

```text
├── index.html                  # HTML entry point & Google Fonts configuration
├── metadata.json               # Application metadata
├── package.json                # Dependencies and build scripts
├── vite.config.ts              # Vite bundler configuration
└── src/
    ├── main.tsx                # React root mount
    ├── App.tsx                 # Main page assembly and smooth navigation
    ├── index.css               # Tailwind CSS imports & GPU layer utilities
    └── components/
        ├── Navbar.tsx          # Top navigation bar
        ├── Hero.tsx            # Section 1: Pinned Hero & GSAP ScrollTrigger logic
        ├── ScrollVisual.tsx    # Central vehicle visual (Interactive GT + Studio Render)
        ├── Stats.tsx           # Impact statistics grid & scroll progress indicators
        ├── ConceptSection.tsx  # Section 2: Concept & interaction architecture breakdown
        ├── Features.tsx        # Section 3: Responsive benchmarks & technical specs
        └── Footer.tsx          # Section 4: Interactive inquiry form & footer
```

---

## Local Installation & Setup (For Reviewers / HR)

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 1. Clone or Download the Repository
```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

### 5. Type-Check / Lint
```bash
npm run lint
```

---

## Deployment Guide (GitHub Pages / Vercel / Netlify)

Because this project is a pure frontend application with no backend dependencies required, the `dist/` folder generated by `npm run build` can be hosted on any static hosting provider:

- **Vercel / Netlify:** Import the repository, set the build command to `npm run build`, and set the output directory to `dist`.
- **GitHub Pages:** Run `npm run build` and deploy the `dist` directory using `gh-pages` or the official GitHub Pages Actions workflow.
