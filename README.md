# Thrivo Core App (Frontend) 🚀

![Thrivo Header](https://via.placeholder.com/1200x400/0A0A0A/00C6D8?text=Thrivo:+The+OS+for+Entrepreneurship)

> **Thrivo** is a horizontal ecosystem designed to solve "founder tool fatigue" by unifying the startup journey end-to-end. It seamlessly connects builders (founders), marketers (creators), funders (investors), and buyers (consumers) under one roof.

## 🏗 Phase 1 MVP

This repository contains the Next.js 15 web client. The current iteration focuses on the core **Phase 1 MVP**, solving discovery and networking in the startup ecosystem:

1. **Startup Discovery Feed**: A highly visual, infinite-scrolling feed (TikTok-style) for discovering new startups, pitches, and products.
2. **Founder Profiles**: Detailed portfolios showcasing a founder's past ventures, traction metrics, and current projects using a striking Bento Grid layout.
3. **Startup Portfolios**: Data-rich startup profiles featuring **Tiered Privacy** (locking sensitive financial metrics behind an investor NDA wall).
4. **Investor Matching**: An interactive directory allowing founders to instantly filter and discover VCs and Angel syndicates by stage and sector.

## 💻 Tech Stack

We utilize a decoupled, high-performance modern web stack:

*   **Framework**: Next.js 15 (App Router) & React 19
*   **Styling**: Tailwind CSS & custom glassmorphic CSS tokens (`globals.css`)
*   **UI Components**: `lucide-react` for iconography.
*   **State Management**: 
    *   **Server State:** TanStack Query (`@tanstack/react-query`) for asynchronous data, caching, and infinite scroll logic.
    *   **Local State:** React `useState` & `useMemo` (Zustand planned for complex global UI state).
    *   *Note: Redux is strictly prohibited in this architecture.*

## 📐 Architecture & Principles

We strictly adhere to masterclass-level frontend engineering principles:

*   **Domain-Driven UI**: Components and logic are grouped by business domain (e.g., `src/features/feed`, `src/features/founders`, `src/features/investors`) rather than monolithic folders.
*   **Performance First**: Heavy reliance on CSS transforms/opacity for 60fps animations. Avoidance of layout-thrashing animations.
*   **Premium Aesthetics**: The UI strictly follows the "Dark Luxury" and "Glassmorphism" design paradigms. We prioritize dark backgrounds, high-contrast cyan/lime gradients (`#00C6D8` to `#8DEE5F`), and immersive UI patterns.

## 📂 Directory Structure

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── founders/         # Founder Directory & Dynamic Profiles
│   ├── investors/        # Investor Matching Portal
│   ├── startups/         # Startup Portfolios
│   └── page.tsx          # Startup Discovery Feed (Home)
├── components/           # Global Shared UI Components (Shell, Sidebar, Nav)
├── features/             # Domain-Driven Feature Modules
│   ├── feed/             # Infinite Scroll Feed logic & components
│   ├── founders/         # Founder Bento Grid, Headers, API mocks
│   ├── investors/        # Investor Cards, Filtering logic, API mocks
│   └── startups/         # Tiered-privacy Metrics Panels, Hero components
├── providers/            # React Context Providers (TanStack Query)
└── styles/               # Global CSS & Tailwind configuration
```

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. All data is currently mocked via the `features/**/api` layers to simulate network latency for UI testing.

## 🔮 Future Roadmap (Phase 2+)

*   **Creator Marketplace**: Affiliate loops for creators promoting vetted products.
*   **Consumer Marketplace**: Native storefronts allowing users to buy products directly from the discovery feed.
*   **Backend Integration**: Swap out TanStack Query mock APIs for live endpoints from `thrivo-backend` (NestJS/PostgreSQL).
