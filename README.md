# Single-SPA Microfrontend Architecture
## Angular 16 + Angular 21 with SystemJS

**Architecture:** Root Config + Two Angular Microfrontends  
**Orchestration:** single-spa + SystemJS (NO Module Federation)  
**Isolation:** Complete - No shared Angular dependencies

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│          Root Config (Vanilla JS + single-spa)      │
│                  Port: 9000                         │
│  ┌───────────────────────────────────────────────┐ │
│  │  SystemJS Import Maps                         │ │
│  │  Navigation                                   │ │
│  │  Route Registration                           │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
           │                            │
           ▼                            ▼
┌──────────────────────┐    ┌──────────────────────┐
│  Angular 16 App      │    │  Angular 21 App      │
│  Port: 4201          │    │  Port: 4202          │
│  Route: /angular16   │    │  Route: /angular21   │
│  Isolated Zone.js    │    │  Isolated Zone.js    │
└──────────────────────┘    └──────────────────────┘
```

---

## 📁 Project Structure

```
single-spa-clean/
├── root-config/                 # Single-SPA root (vanilla JS)
│   ├── src/
│   │   ├── index.html          # Entry point + import maps
│   │   ├── root-config.js      # single-spa registration
│   │   └── styles.css          # Global styles
│   ├── package.json
│   └── webpack.config.js
├── angular16-app/               # Angular 16 microfrontend
│   ├── src/
│   │   ├── app/
│   │   ├── main.single-spa.ts  # single-spa lifecycle
│   │   └── single-spa-props.ts
│   ├── angular.json
│   ├── package.json
│   └── webpack.config.js       # Custom webpack for single-spa
├── angular21-app/               # Angular 21 microfrontend
│   ├── src/
│   │   ├── app/
│   │   ├── main.single-spa.ts  # single-spa lifecycle
│   │   └── single-spa-props.ts
│   ├── angular.json
│   ├── package.json
│   └── webpack.config.js
└── README.md                    # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Root config
cd root-config && npm install

# Angular 16 app
cd ../angular16-app && npm install

# Angular 21 app
cd ../angular21-app && npm install
```

### 2. Start All Services

**Terminal 1 - Root Config:**
```bash
cd root-config
npm start
# Runs on http://localhost:9000
```

**Terminal 2 - Angular 16 App:**
```bash
cd angular16-app
npm start
# Runs on http://localhost:4201
```

**Terminal 3 - Angular 21 App:**
```bash
cd angular21-app
npm start
# Runs on http://localhost:4202
```

### 3. Access the Application

Open **http://localhost:9000** in your browser.

Use the navigation menu to switch between:
- **/angular16** → Angular 16 App
- **/angular21** → Angular 21 App

---

## 🔑 Key Features

### ✅ Complete Isolation
- Each Angular app has its own Zone.js
- No shared Angular dependencies
- Independent build and deployment

### ✅ SystemJS Import Maps
- Dynamic module loading
- No build-time coupling
- Easy to update individual apps

### ✅ Proper single-spa Integration
- Lifecycle hooks: bootstrap, mount, unmount
- Route-based activation
- Clean app switching

### ✅ Production Ready
- TypeScript throughout
- Proper error handling
- Scoped styling
- Development and production configs

---

## 📦 Package Scripts

### Root Config
```bash
npm start       # Dev server (webpack-dev-server)
npm run build   # Production build
```

### Angular Apps (both 16 & 21)
```bash
npm start                    # Dev server
npm run build                # Production build
npm run build:single-spa     # Build as single-spa app
npm run serve:single-spa     # Serve single-spa build
```

---

## 🎯 How It Works

### 1. Root Config Loads
- Initializes single-spa
- Sets up SystemJS import maps
- Registers Angular apps with routes
- Starts single-spa

### 2. User Navigates to /angular16
- single-spa matches route
- Loads `http://localhost:4201/main.js` via SystemJS
- Calls `bootstrap()` → `mount()`
- Angular 16 app renders

### 3. User Navigates to /angular21
- single-spa unmounts Angular 16 (`unmount()`)
- Loads Angular 21 app
- Mounts Angular 21 app

---

## 🔧 Configuration Files

### Import Map (root-config/src/index.html)
```html
<script type="systemjs-importmap">
{
  "imports": {
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@6.0.0/lib/system/single-spa.min.js",
    "@spa/angular16": "http://localhost:4201/main.js",
    "@spa/angular21": "http://localhost:4202/main.js"
  }
}
</script>
```

### App Registration (root-config/src/root-config.js)
```javascript
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@spa/angular16',
  app: () => System.import('@spa/angular16'),
  activeWhen: ['/angular16']
});

registerApplication({
  name: '@spa/angular21',
  app: () => System.import('@spa/angular21'),
  activeWhen: ['/angular21']
});

start();
```

---

## 🐛 Troubleshooting

### Issue: Zone.js Conflicts
**Solution:** Each Angular app bundles its own Zone.js in polyfills.

### Issue: Apps Don't Load
**Check:**
1. All three servers running?
2. Correct ports (9000, 4201, 4202)?
3. CORS enabled on Angular dev servers?

### Issue: Routing Issues
**Solution:** Use `APP_BASE_HREF` in each Angular app:
```typescript
{ provide: APP_BASE_HREF, useValue: '/angular16/' }
```

---

## 📚 Resources

- [single-spa Docs](https://single-spa.js.org/)
- [single-spa-angular](https://single-spa.js.org/docs/ecosystem-angular/)
- [SystemJS](https://github.com/systemjs/systemjs)

---

## 🎓 Learning Path

1. **Start Simple:** Get root-config + one app working
2. **Add Second App:** Verify isolation works
3. **Add Routing:** Implement in-app routing
4. **Add Styling:** Test scoped styles
5. **Production Build:** Deploy separately

---

## ✅ Production Checklist

- [ ] Build all apps for production
- [ ] Deploy each app to separate domains/CDNs
- [ ] Update import maps with production URLs
- [ ] Configure proper CORS headers
- [ ] Add error boundaries
- [ ] Monitor for Zone.js conflicts
- [ ] Test navigation thoroughly

---

**Built with:** single-spa 6.x, Angular 16 & 21, SystemJS, TypeScript  
**Architecture:** Micro-frontends with complete isolation  
**Status:** Production-ready foundation
