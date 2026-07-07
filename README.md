# Thrivo Frontend 🚀

[![Flutter Version](https://img.shields.io/badge/Flutter-v3.22.x-blue.svg?logo=flutter&logoColor=white)](https://flutter.dev)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey.svg)](#)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](#)

Welcome to the frontend repository for **Thrivo** — a secure, high-trust, multi-sided discovery ecosystem built to democratize and secure the entrepreneurial journey. 

Thrivo's client-side application is engineered using **Flutter** to deliver a fluid, native experience across Android, iOS, and Web.

---

## 📱 Key Frontend Features (MVP)

1. **Polymorphic Onboarding & Profile Engine**
   - Seamless onboarding flow branching dynamically based on user identity flags: **Founder/SMB**, **Creator/Influencer**, or **Investor**.
   - Custom dashboards and layouts tailored for each role (e.g., pitch deck viewer for investors, grid storefront for founders, media portfolio for creators).

2. **High-Performance Discovery Feed**
   - Lag-free, vertical scrolling video/image feed (similar to Reels) showcasing products and startup pitches.
   - Low-latency multi-tenant search and filter systems.

3. **Secure Transaction UI & Checkout**
   - Embedded Razorpay checkout client for zero-friction native purchases.
   - Milestone progress tracking panels with escrow status visualization.

4. **Real-Time Interaction Layer**
   - Native chat interfaces for direct negotiation between stakeholder roles.
   - In-app push notifications for instant matches and deal inquiries.

---

## 🛠️ Technology Stack

- **Framework:** Flutter (Dart)
- **State Management:** BLoC / Riverpod
- **Local Cache/Storage:** Hive / Isar
- **Real-Time Messaging:** Socket.io client bindings
- **Analytics:** Mixpanel SDK, Firebase Analytics
- **Payments:** Razorpay Flutter SDK
- **Push Alerts:** Firebase Cloud Messaging (FCM)

---

## 📂 Repository Structure

```
thrivo-frontend/
├── android/                  # Native Android configuration
├── ios/                      # Native iOS configuration
├── web/                      # Web-specific setup
├── lib/                      # Core Flutter source code
│   ├── main.dart             # Application entry point
│   ├── app/                  # App routing and global configuration
│   ├── core/                 # Shared utilities, constants, theme, and network services
│   │   ├── theme/            # Curated modern UI design system (colors, typography)
│   │   └── security/         # Encryption & data handling utilities
│   ├── features/             # Feature-based modular structure
│   │   ├── auth/             # Onboarding, Login, and Registration
│   │   ├── discovery/        # Video discovery feed and search filters
│   │   ├── profile/          # Polymorphic profiles (Founder, Investor, Creator)
│   │   ├── chat/             # Direct messaging and Socket.io client integration
│   │   └── escrow/           # Escrow transaction status and milestone tracking
│   └── widgets/              # Reusable UI components (buttons, cards, badges)
└── pubspec.yaml              # Dependencies and assets configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Flutter SDK (v3.22.x or later)
- Dart SDK (v3.4.x or later)
- Android Studio / VS Code with Flutter extensions
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ambixion-Corp/thrivo-frontend.git
   cd thrivo-frontend
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the backend endpoints:
   ```env
   THRIVO_BACKEND_URL=https://api.thrivo.ambixion.corp
   SUPABASE_URL=https://your-supabase-project.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the application:
   ```bash
   # Run on connected emulator/device
   flutter run
   
   # Run for Web
   flutter run -d chrome
   ```

---

## 🎨 Design System & Aesthetics

Thrivo's UI focuses on premium aesthetics:
- **Color Palette:** Sleek dark-mode oriented palette with modern gradients.
- **Typography:** Using highly readable modern sans-serif typefaces (e.g., Outfit, Inter).
- **Feedback & Micro-animations:** Responsive hover effects, smooth swipe gestures, and tactile haptic feedback.