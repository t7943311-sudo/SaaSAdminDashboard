# LaunchBase: The Ultimate SaaS Starter Kit

LaunchBase is a production-ready Next.js starter kit designed to help you launch your SaaS application in days, not months. It comes packed with all the essential features you need, built on a modern, scalable, and developer-friendly tech stack.

## ✨ Features

- **Authentication:** Secure sign-up, login, password reset, and social auth flows.
- **Dashboard & UI:** A complete, customizable dashboard with charts, tables, and widgets.
- **Billing & Subscriptions:** A subscription management portal for users to change plans and view invoices.
- **Admin Panel:** A powerful command center for managing users, revenue, and platform settings.
- **AI Integration:** Built-in AI template generator powered by Google's Genkit.
- **Theme Builder:** A no-code tool to customize your application's look and feel in real-time.
- **Developer Documentation:** A full, professional documentation portal to guide developers.
- **And much more:** Role-based access, team management, API key stubs, webhook examples, audit logs, and robust state handling.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **AI:** Google Genkit
- **UI:** Tailwind CSS & shadcn/ui
- **Deployment:** Ready for Firebase App Hosting

## 🏁 Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Firebase account

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-repo/launchbase.git
cd launchbase
npm install
```

### 3. Environment Setup

This project uses Firebase. The easiest way to get started is to use Firebase Studio to provision and configure a new project for you.

Alternatively, you can manually create a project in the [Firebase Console](https://console.firebase.google.com/) and add your configuration to `src/firebase/config.ts`.

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
```

Your application will be running at `http://localhost:9002`.

## 📚 Full Documentation

For detailed guides on architecture, customization, and API reference, please see the full documentation included with the project by running it and navigating to `/docs`.
