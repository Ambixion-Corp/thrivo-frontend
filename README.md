# Thrivo Web Frontend 🚀

[![Web Client](https://img.shields.io/badge/Stack-React%20%7C%20Vite-blue.svg?logo=react&logoColor=white)](https://react.dev)
[![Platform](https://img.shields.io/badge/Platform-Web%20(Responsive)-lightgrey.svg)](#)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](#)

Welcome to the frontend repository for the **Thrivo Web Application** — a secure, high-trust, multi-sided discovery ecosystem built to democratize and secure the entrepreneurial journey. 

This repository specifically hosts the web client interface (optimized for desktop, tablet, and mobile browsers).

---

## 📱 Key Web Frontend Features (MVP)

1. **Polymorphic Onboarding & Profile Engine**
   - Seamless onboarding flow branching dynamically based on user identity flags: **Founder/SMB**, **Creator/Influencer**, or **Investor**.
   - Custom dashboards and layouts tailored for each role (e.g., pitch deck viewer for investors, grid storefront for founders, media portfolio for creators).

2. **High-Performance Discovery Feed**
   - Fluid, vertical scrolling web video/image feed (similar to Reels) showcasing products and startup pitches.
   - Low-latency multi-tenant search and filter systems.

3. **Secure Transaction UI & Checkout**
   - Embedded Razorpay web checkout client for zero-friction native purchases.
   - Milestone progress tracking panels with escrow status visualization.

4. **Real-Time Interaction Layer**
   - Web-based chat interfaces for direct negotiation between stakeholder roles.
   - Web push notifications for instant matches and deal inquiries.

---

## 🛠️ Technology Stack

- **Framework:** React / Vite (or Next.js)
- **Styling:** Vanilla CSS / Modern CSS Variables (Custom Design System)
- **State Management:** Redux Toolkit / React Context
- **Real-Time Messaging:** Socket.io client bindings
- **Analytics:** Mixpanel SDK, Firebase Analytics
- **Payments:** Razorpay Web Checkout Integration
- **Push Alerts:** Web Push API / Firebase Cloud Messaging (FCM)

---

## 📂 Repository Structure

```
thrivo-frontend/
├── public/                   # Static assets, fonts, icons
├── src/                      # React source code
│   ├── main.jsx              # Web application entry point
│   ├── App.jsx               # Root component and router
│   ├── assets/               # Local images and icons
│   ├── components/           # Reusable UI components (buttons, cards, badges)
│   ├── context/              # Context providers (auth state, themes)
│   ├── styles/               # Global vanilla CSS files and modern design system tokens
│   ├── utils/                # Helper functions and web security adapters
│   └── features/             # Feature-based modular structure
│       ├── auth/             # Onboarding, Login, and Registration
│       ├── discovery/        # Video discovery feed and search filters
│       ├── profile/          # Polymorphic profiles (Founder, Investor, Creator)
│       ├── chat/             # Direct messaging and Socket.io client integration
│       └── escrow/           # Escrow transaction status and milestone tracking
├── index.html                # Main HTML entry point
├── vite.config.js            # Vite build configuration
└── package.json              # Web dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.x or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ambixion-Corp/thrivo-frontend.git
   cd thrivo-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_THRIVO_BACKEND_URL=https://api.thrivo.ambixion.corp
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the application locally in development mode:
   ```bash
   npm run dev
   ```

---

## 🎨 Design System & Aesthetics

Thrivo's UI focuses on premium aesthetics:
- **Color Palette:** Sleek dark-mode oriented palette with modern gradients.
- **Typography:** Using highly readable modern sans-serif typefaces (e.g., Outfit, Inter).
- **Feedback & Micro-animations:** Responsive hover effects, smooth swipe gestures, and tactile feedback.