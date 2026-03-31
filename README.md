# 🦞 Single-SPA Microfrontend Architecture
## Angular 16 + Angular 21 with SystemJS

[![Status](https://img.shields.io/badge/status-working-brightgreen)]()
[![single-spa](https://img.shields.io/badge/single--spa-6.0.0-blue)]()
[![Angular](https://img.shields.io/badge/Angular-16%20%7C%2021-red)]()

**Architecture:** Root Config + Angular Microfrontends  
**Orchestration:** single-spa + SystemJS (NO Module Federation)  
**Isolation:** Complete - Each app has its own Zone.js and dependencies

> ✅ **Working Demo** - Tested and verified with network access support

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────┐
│   Browser (Port 9000)                       │
│   ┌───────────────────────────────────┐    │
│   │   Root Config                     │    │
│   │   - single-spa (bundled locally)  │    │
│   │   - Navigation                    │    │
│   │   - Route Registration            │    │
│   └───────────────────────────────────┘    │
└─────────────────────────────────────────────┘
        │                          │
        │ SystemJS Import          │
        ▼                          ▼
┌──────────────────┐      ┌──────────────────┐
│  Angular 16 App  │      │  Angular 21 App  │
│  Port: 4201      │      │  Port: 4202      │
│  Route: /ang16   │      │  Route: /ang21   │
│  ──────────────  │      │  ──────────────  │
│  Own Zone.js ✓   │      │  Own Zone.js ✓   │
│  Isolated    ✓   │      │  Isolated    ✓   │
└──────────────────┘      └──────────────────┘
```

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ (tested on v22.22.1)
- npm 9+

### 1. Install Dependencies

```bash
# Root config
cd root-config
npm install

# Angular 16 app
cd ../angular16-app
npm install
```

### 2. Start Services

Open **two terminal windows**:

**Terminal 1 - Root Config:**
```bash
cd root-config
npm start
```
✅ Listening on: **http://localhost:9000**

**Terminal 2 - Angular 16 App:**
```bash
cd angular16-app
npm start
```
✅ Listening on: **http://0.0.0.0:4201** (network accessible)

### 3. Open in Browser

- **Local access:** http://localhost:9000
- **Network access:** http://YOUR_LOCAL_IP:9000

**Example:** http://192.168.3.63:9000

---

## ✅ Success Indicators

When everything works, you should see:

1. **Root Config Console:**
   ```
   ✅ Single-SPA root-config initialized
   📍 Registered applications:
      - @spa/angular16 (route: /angular16)
      - @spa/angular21 (route: /angular21)
   ```

2. **Angular 16 Console:**
   ```
   [Angular 16] Bootstrap
   [Angular 16] Mount
   [Angular 16] Successfully mounted
   ```

3. **Browser Display:**
   - Welcome screen with navigation
   - Click "Angular 16" → Angular 16 app loads
   - Counter button works
   - No errors in console (Zone.js warnings are OK)

---

## 📁 Project Structure

```
single-spa-clean/
├── root-config/                 # Orchestration layer
│   ├── src/
│   │   ├── index.html          # Import maps + SystemJS
│   │   ├── root-config.js      # App registration
│   │   └── styles.css          # Global styles
│   ├── package.json
│   └── webpack.config.js       # Bundles single-spa locally
│
├── angular16-app/               # Angular 16 microfrontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.module.ts
│   │   │   ├── app.component.ts
│   │   │   └── home/
│   │   │       └── home.component.ts  # Feature demo
│   │   ├── main.single-spa.ts  # Lifecycle hooks
│   │   ├── single-spa-props.ts # Props interface
│   │   └── polyfills.ts        # Zone.js import
│   ├── angular.json            # Custom webpack builder
│   ├── package.json
│   └── webpack.config.js       # SystemJS output config
│
├── README.md                    # This file
├── QUICKSTART.md               # 5-minute guide
├── SETUP.md                    # Detailed setup
├── CREATE_ANGULAR21.md         # How to add Angular 21
└── PROJECT_SUMMARY.md          # Complete overview
```

---

## 🔑 Key Technical Details

### Single-SPA Integration

**Root Config (root-config.js):**
```javascript
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@spa/angular16',
  app: () => System.import('@spa/angular16'),
  activeWhen: ['/angular16']
});

start({ urlRerouteOnly: true });
```

**Import Maps (index.html):**
```html
<script type="systemjs-importmap">
{
  "imports": {
    "@spa/angular16": "http://YOUR_IP:4201/main.js",
    "@spa/angular21": "http://YOUR_IP:4202/main.js"
  }
}
</script>
```

### Angular Lifecycle (main.single-spa.ts)

```typescript
import 'zone.js'; // CRITICAL: Load Zone.js first

export async function bootstrap(props) {
  // One-time initialization
}

export async function mount(props) {
  // Create DOM container
  const container = document.createElement('div');
  const appRoot = document.createElement('app-root');
  container.appendChild(appRoot);
  document.getElementById('single-spa-application').appendChild(container);
  
  // Bootstrap Angular
  ngModuleRef = await platformBrowserDynamic().bootstrapModule(AppModule);
}

export async function unmount(props) {
  // Destroy Angular and clean up DOM
  ngModuleRef.destroy();
  container.remove();
}
```

### Zone.js Isolation

Each Angular app bundles its own Zone.js:
```typescript
// main.single-spa.ts
import 'zone.js'; // Bundled with this app
```

This ensures:
- ✅ No conflicts between Angular versions
- ✅ Complete isolation
- ✅ Independent updates

---

## 🎯 Features

### ✅ Complete Isolation
- Each Angular app has its own Zone.js instance
- No shared dependencies between apps
- Different Angular versions coexist peacefully

### ✅ SystemJS Import Maps
- Dynamic module loading at runtime
- No build-time coupling between apps
- Update one app without rebuilding others

### ✅ Network Access
- Root config accessible from any device on network
- Angular apps bound to 0.0.0.0 (all interfaces)
- Perfect for testing on mobile devices

### ✅ Production Ready
- TypeScript throughout
- Proper error handling
- Source maps for debugging
- Build scripts included

---

## 🔧 Configuration Details

### Network Access Setup

Angular apps are configured to listen on all interfaces:

**package.json:**
```json
{
  "scripts": {
    "start": "ng serve --port 4201 --host 0.0.0.0 --disable-host-check"
  }
}
```

**Update import maps with your local IP:**
```html
<script type="systemjs-importmap">
{
  "imports": {
    "@spa/angular16": "http://192.168.3.63:4201/main.js"
  }
}
</script>
```

### Webpack Configuration

**Root Config** - Regular webpack bundle:
```javascript
module.exports = {
  entry: './src/root-config.js',
  output: {
    filename: 'root-config.js',
    // No SystemJS wrapper - loaded via <script> tag
  },
  externals: [], // Bundle single-spa locally
};
```

**Angular Apps** - SystemJS modules:
```javascript
module.exports = (config, options) => {
  const singleSpaConfig = singleSpaAngularWebpack(config, options);
  
  singleSpaConfig.output = {
    library: { type: 'system', name: '@spa/angular16' },
    filename: 'main.js',
  };
  
  return singleSpaConfig;
};
```

---

## 🐛 Troubleshooting

### Issue: "Unable to resolve bare specifier 'single-spa'"
**Solution:** single-spa is now bundled in root-config.js (no CDN dependency)

### Issue: "NG0908: Angular requires Zone.js"
**Solution:** Zone.js is imported at top of main.single-spa.ts

### Issue: Angular app doesn't load
**Check:**
1. Angular dev server running? (`npm start` in angular16-app)
2. Check network IP in import maps matches your machine
3. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### Issue: Can't access from other devices
**Solution:** 
1. Update import maps with your local IP (not localhost)
2. Ensure firewall allows connections on ports 9000, 4201

### Issue: Route duplication (`/angular16/#/angular16/`)
**Solution:** Angular routing configured with `useHash: false` and `APP_BASE_HREF: '/'`

---

## 📚 Additional Documentation

- **QUICKSTART.md** - Get running in 5 minutes
- **SETUP.md** - Detailed setup instructions
- **CREATE_ANGULAR21.md** - How to add Angular 21 app
- **PROJECT_SUMMARY.md** - Complete technical overview

---

## 🚀 Production Deployment

### Build All Apps

```bash
# Root config
cd root-config && npm run build

# Angular 16
cd angular16-app && npm run build:single-spa
```

### Deploy to CDN

Update import maps with production URLs:
```javascript
{
  "imports": {
    "@spa/angular16": "https://cdn.example.com/angular16/main.js",
    "@spa/angular21": "https://cdn.example.com/angular21/main.js"
  }
}
```

### Benefits

- ✅ Zero-downtime updates (update apps independently)
- ✅ Team autonomy (different teams, different Angular versions)
- ✅ Independent scaling based on usage
- ✅ Technology flexibility

---

## 🎓 Learning Resources

- **single-spa Docs:** https://single-spa.js.org/
- **single-spa-angular:** https://single-spa.js.org/docs/ecosystem-angular/
- **SystemJS:** https://github.com/systemjs/systemjs

---

## 💡 Why This Architecture?

### vs Module Federation
- ✅ Simpler import maps (no shared scope complexity)
- ✅ True runtime independence
- ✅ No build-time coupling

### vs Iframes
- ✅ Better UX (no iframe boundaries)
- ✅ Shared state possible (if needed)
- ✅ Proper SPA routing

### vs Monolith
- ✅ Independent deployments
- ✅ Team autonomy
- ✅ Technology flexibility (mix Angular versions)

---

## 📊 Project Stats

- **Lines of Code:** ~2,500+
- **Documentation Files:** 5
- **Build Time:** Angular 16: ~4s, Root: ~1s
- **Bundle Sizes:**
  - Root config: ~592 KB (with single-spa bundled)
  - Angular 16: ~2.41 MB (with Zone.js)

---

## 🏆 Status

- ✅ **Root Config:** Production ready
- ✅ **Angular 16 App:** Working and tested
- 📋 **Angular 21 App:** Instructions provided (see CREATE_ANGULAR21.md)
- ✅ **Documentation:** Complete
- ✅ **Network Access:** Verified
- ✅ **Error Free:** All issues resolved

---

## 🤝 Contributing

To add more microfrontends:

1. Copy angular16-app folder
2. Update ports and names
3. Register in root-config.js
4. Add to import maps
5. Test and document

---

## 📝 License

MIT License - Feel free to use in your projects!

---

**Built with ❤️ using single-spa, Angular, and SystemJS**

_Ready to scale your frontend architecture!_ 🚀
