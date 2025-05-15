## Overview

The application was developed using Expo and features two screens along with several components. State management is handled with MobX, complemented by auxiliary libraries for data persistence. Special attention was given to minimizing re-renders throughout the app, primarily achieved through the use of MobX computed properties. The application's architecture allows for avoiding the use of useCallback hooks for handlers passed to child components, thereby maintaining optimal performance and simplicity.

## Requirements

Before starting, ensure you have:

- **Node.js** (LTS version recommended) — [https://nodejs.org/](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Expo CLI** — globally installed:

Installation

Clone the repository or create a new project:

```bash
git clone https://github.com/makarevichyauhen/test-app.git
cd test-app
npm install
npx expo start
```

Viewing on Device
Install Expo Go app from App Store or Google Play.
Scan the QR code displayed in your terminal or browser to open the app on your device.
