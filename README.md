# Thrivo Frontend

Welcome to the frontend repository for the Thrivo ecosystem. The frontend contains two native client layers optimized for distinct interaction densities: a dense data-driven Web Application and a rapid-interaction mobile client.

---

## Client Layers Stack

### 1. Web Client Layer (Next.js 15)
- **Core Technologies:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui.
- **Architectural Justification:** Server-Side Rendering (SSR) maximizes the SEO discoverability index score for public-facing creator portfolios and founder launch campaigns.

### 2. Mobile Client Layer (React Native & Expo)
- **Core Technologies:** React Native, Expo, Shopify's FlashList, MMKV Local Memory Storage.
- **Architectural Justification:** Cross-platform native thread performance. Shopify's FlashList handles intense dynamic recycling of video asset cells to maintain 60FPS fluid navigation. MMKV provides high-speed, secure local memory storage for JWT renewal keys.

---

## Low-Latency System Security Strategy

### Biometric Access & Token Control Loop
Client communication cycles rely on dual JWT configurations (short-lived access parameters with a lifespan of 15 minutes alongside a sliding renewal token expiring in 7 days). On mobile layers, renewal keys are sealed natively within hardware-encrypted secure storage blocks triggered by biometric authentication signatures (iOS FaceID / Android BiometricPrompt APIs).

### Creator Likeness Digital Signature Verification
To prevent generative identity exploitation or unauthorized duplication of promotional media assets, every piece of video material uploaded by verified creators undergoes server-side frame analysis and receives a metadata-injected cryptographic watermarking footprint using SHA-256 block chains before propagation across CDN edge caches.

---

## Repository Structure

```
thrivo-frontend/
├── web/                      # Web application (Next.js 15)
│   ├── app/                  # Next.js App Router (pages & layouts)
│   │   ├── layout.tsx        # Global Layout
│   │   ├── page.tsx          # Homepage
│   │   ├── dashboard/        # Dashboards (Founders, Creators, Investors)
│   │   ├── discovery/        # Video discovery feed and search filters
│   │   └── escrow/           # Escrow transaction status and milestone tracking
│   ├── components/           # UI components (shadcn/ui elements, buttons, cards)
│   ├── hooks/                # Custom React Hooks
│   ├── styles/               # Global CSS files and Tailwind configurations
│   ├── next.config.ts        # Next.js configuration
│   └── tailwind.config.ts    # Tailwind CSS configuration
│
├── mobile/                   # Mobile application (React Native / Expo)
│   ├── app/                  # Expo Router directory
│   ├── components/           # Mobile native UI components
│   ├── hooks/                # Custom native Hooks
│   ├── storage/              # MMKV secure local key-value storage setup
│   └── app.json              # Expo configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v20.x or later)
- Expo Go application on mobile devices (for testing the mobile client)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ambixion-Corp/thrivo-frontend.git
   cd thrivo-frontend
   ```

2. Web Client Development:
   ```bash
   cd web
   npm install
   npm run dev
   ```

3. Mobile Client Development:
   ```bash
   cd mobile
   npm install
   npx expo start
   ```