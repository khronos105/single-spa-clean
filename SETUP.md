# 🚀 Setup Instructions - Single-SPA Microfrontends

Complete step-by-step guide to get the Single-SPA architecture running.

---

## ✅ Prerequisites

- **Node.js:** v18+ (recommended: v20)
- **npm:** v9+
- **Terminal:** 3 terminal windows

---

## 📦 Step 1: Install Dependencies

### Terminal 1 - Root Config
```bash
cd ~/projects/single-spa-clean/root-config
npm install
```

### Terminal 2 - Angular 16 App  
```bash
cd ~/projects/single-spa-clean/angular16-app
npm install
```

### Terminal 3 - Angular 21 App
```bash
# NOTE: Angular 21 structure mirrors Angular 16
# Copy angular16-app folder and modify:
# - Update package.json versions to Angular 21
# - Change port to 4202
# - Update component text to "Angular 21"
```

---

## 🏃 Step 2: Start All Services

**Start in this order:**

### 1. Start Angular 16 App (Terminal 2)
```bash
cd ~/projects/single-spa-clean/angular16-app
npm start
```
Wait for: `✔ Compiled successfully.`  
Running on: **http://localhost:4201**

### 2. Start Angular 21 App (Terminal 3)
```bash
cd ~/projects/single-spa-clean/angular21-app
npm start
```
Running on: **http://localhost:4202**

### 3. Start Root Config (Terminal 1)
```bash
cd ~/projects/single-spa-clean/root-config
npm start
```
Running on: **http://localhost:9000**

---

## 🌐 Step 3: Access the Application

Open your browser and navigate to:

**http://localhost:9000**

You should see:
- ✅ Welcome screen with navigation
- ✅ Links to `/angular16` and `/angular21`
- ✅ Styled header and features section

---

## 🧪 Step 4: Test Navigation

1. Click **"Angular 16"** in the navigation
   - URL changes to `/angular16`
   - Angular 16 app loads and displays
   - Check browser console for lifecycle logs

2. Click **"Angular 21"** in the navigation
   - Angular 16 unmounts
   - Angular 21 mounts
   - Different content displays

3. Click **"Home"** to return to welcome screen

---

## 🔍 What to Look For

### Browser Console Logs

You should see:
```
✅ Single-SPA root-config initialized
📍 Registered applications:
   - @spa/angular16 (route: /angular16)
   - @spa/angular21 (route: /angular21)

[Angular 16] Bootstrap {name: "@spa/angular16", ...}
[Angular 16] Mount {...}
[Angular 16] Successfully mounted
```

### Network Tab

Check that these load:
- `http://localhost:9000/root-config.js`
- `http://localhost:4201/main.js` (when on /angular16)
- `http://localhost:4202/main.js` (when on /angular21)

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch module"

**Problem:** Angular apps not running  
**Solution:** Make sure both Angular apps are started (`npm start`)

### Issue: CORS errors

**Problem:** CORS blocked by browser  
**Solution:** Angular dev servers have CORS enabled by default. Clear browser cache.

### Issue: Zone.js conflicts

**Problem:** Two Zone.js instances  
**Solution:** Each Angular app bundles its own Zone.js. This is correct for isolation.

### Issue: Route doesn't work

**Problem:** Direct navigation to `/angular16` returns 404  
**Solution:** Use the navigation links, or configure historyApiFallback in webpack.

---

## ✨ Success Criteria

You've succeeded if:

- [x] All 3 servers running without errors
- [x] Root config displays welcome screen
- [x] Clicking "Angular 16" loads that app
- [x] Clicking "Angular 21" loads that app
- [x] Navigation works smoothly
- [x] No console errors (except Zone.js warnings OK)
- [x] Counter button works in each app
- [x] Apps unmount cleanly when navigating away

---

## 📚 Next Steps

### Add Features
- Add routing within Angular apps
- Add shared state management
- Add inter-app communication

### Production Build
```bash
# Build each app
cd root-config && npm run build
cd ../angular16-app && npm run build:single-spa
cd ../angular21-app && npm run build:single-spa

# Deploy each to separate domains/CDNs
# Update import maps with production URLs
```

### Add More Apps
1. Copy angular16-app or angular21-app
2. Change port, name, route
3. Register in root-config.js
4. Add to import map

---

## 🎓 Architecture Recap

```
User visits localhost:9000
    ↓
Root Config loads (vanilla JS)
    ↓
Registers Angular 16 & 21 via single-spa
    ↓
User clicks "Angular 16"
    ↓
SystemJS imports http://localhost:4201/main.js
    ↓
single-spa calls bootstrap() → mount()
    ↓
Angular 16 app renders
```

---

## 📞 Support

- **single-spa Docs:** https://single-spa.js.org
- **SystemJS Docs:** https://github.com/systemjs/systemjs
- **Angular single-spa:** https://single-spa.js.org/docs/ecosystem-angular/

---

**Ready to build!** 🚀
