# Laundrymator

Laundrymator is a minimalist wardrobe management application designed to help users track the usage and laundry cycles of their clothing. It provides a focused interface for cataloging garments and monitoring when they need to be washed based on real-world usage.

## Features

- **Local-First Architecture**: All data is stored directly in your browser using IndexedDB, ensuring fast performance and offline availability.
- **Progressive Web App**: Can be installed on mobile and desktop devices, providing a native-like experience with offline support.
- **Clothing Management**: Easily add, edit, and categorize items in your wardrobe.
- **Usage Tracking**: Monitor how many times each item has been worn and receive visual cues when it reaches its washing threshold.
- **Privacy by Design**: No cloud storage or account required. Your data never leaves your device.
- **Dynamic Image Support**: Store photos of your clothes locally as Blobs, with automatic URL generation for high-performance rendering.

## Tech Stack

- **Framework**: Nuxt 4 (SPA mode)
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Database**: IndexedDB (via `idb` library)
- **Forms & Validation**: VeeValidate and Zod
- **PWA Support**: @vite-pwa/nuxt

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

Generate a static production build:

```bash
npm run generate
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

This project follows the Nuxt 4 directory structure, with the core application logic located in the `app/` directory:

- `app/components/`: Reusable Vue components.
- `app/pages/`: Application views and routing.
- `app/stores/`: Pinia state management modules.
- `app/utils/`: Database utilities and helper functions.
- `app/interfaces/`: TypeScript type definitions.

## Design Decisions

- **SPA Mode**: Configured with `ssr: false` to prioritize a responsive, app-like feel essential for a mobile-first PWA.
- **Binary Storage**: Images are stored as Blobs in IndexedDB to maintain data integrity and avoid the limitations of Base64 strings.
- **Modular Utilities**: Database operations are abstracted into specialized utility files (`clothesdb.ts`, `settingsdb.ts`) for better maintainability and testability.
