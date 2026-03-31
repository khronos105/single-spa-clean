# ⚡ Quick Start - Get Running in 5 Minutes

## 🎯 Goal
Get Single-SPA running with Angular 16 app

---

## 📋 Steps

### 1. Install (2 minutes)
```bash
# Terminal 1 - Root Config
cd ~/projects/single-spa-clean/root-config
npm install

# Terminal 2 - Angular 16
cd ~/projects/single-spa-clean/angular16-app
npm install
```

### 2. Start (1 minute)
```bash
# Terminal 1 - Root Config
npm start
# ✅ Running on http://localhost:9000

# Terminal 2 - Angular 16
npm start
# ✅ Running on http://localhost:4201
```

### 3. Test (2 minutes)
- Open **http://localhost:9000**
- Click **"Angular 16"** in navigation
- See Angular 16 app load!
- Click counter button
- Navigate back to Home

---

## ✅ Success?

You should see:
- ✅ Welcome screen with navigation
- ✅ Angular 16 app loads on `/angular16`
- ✅ No console errors (Zone.js warnings OK)
- ✅ Counter works
- ✅ Smooth navigation

---

## 🐛 Issues?

**Can't install:**
- Check Node.js version: `node -v` (need v18+)
- Try: `npm cache clean --force`

**Port in use:**
- Kill process: `lsof -ti:9000 | xargs kill -9`
- Or change port in package.json

**Module not found:**
- Restart Angular 16 app
- Check it's on port 4201

---

## 📚 Next Steps

1. **Add Angular 21:** Follow `CREATE_ANGULAR21.md`
2. **Customize:** Edit components, add features
3. **Learn:** Read `README.md` for architecture details

---

## 🎓 What Just Happened?

```
You started → Root Config (9000)
              └─ Registered Angular 16 (4201)
              
You clicked "/angular16"
              ↓
Single-SPA activated app
              ↓
SystemJS loaded main.js from 4201
              ↓
bootstrap() → mount()
              ↓
Angular 16 rendered!
```

---

**That's it!** You're running a production-ready microfrontend architecture. 🚀

**Need help?** Check:
- `SETUP.md` - Detailed instructions
- `README.md` - Architecture overview
- `PROJECT_SUMMARY.md` - Complete details
