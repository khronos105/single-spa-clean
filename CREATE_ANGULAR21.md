# Creating Angular 21 App from Angular 16

The Angular 21 app is structurally identical to Angular 16, with these changes:

## Method 1: Manual Copy & Modify

```bash
# Copy the entire angular16-app folder
cp -r angular16-app angular21-app
cd angular21-app
```

## Changes Required:

### 1. package.json
Change all Angular versions from `^16.2.0` to `^21.0.0`:
```json
{
  "name": "@spa/angular21",
  "dependencies": {
    "@angular/core": "^21.0.0",
    "@angular/common": "^21.0.0",
    // ... all other @angular/* packages
  },
  "devDependencies": {
    "@angular/cli": "^21.0.0",
    "@angular/compiler-cli": "^21.0.0",
    "@angular-devkit/build-angular": "^21.0.0",
    "@angular-builders/custom-webpack": "^21.0.0",
    "single-spa-angular": "^9.0.0"  // Updated for Angular 21
  },
  "scripts": {
    "start": "ng serve --port 4202 --disable-host-check"  // Port 4202!
  }
}
```

### 2. angular.json
```json
{
  "projects": {
    "angular21-app": {  // Change project name
      "architect": {
        "serve": {
          "options": {
            "port": 4202  // Change port to 4202
          }
        }
      }
    }
  }
}
```

### 3. webpack.config.js
```javascript
singleSpaConfig.output = {
  ...singleSpaConfig.output,
  library: {
    type: 'system',
    name: '@spa/angular21',  // Change name
  }
};
```

### 4. src/app/home/home.component.ts
Update display text:
```typescript
export class HomeComponent {
  angularVersion = '21.0.0';  // Change version
  
  template: `
    <h1>🅰️ Angular 21 Microfrontend</h1>  // Change text
    <span class="version-badge">v21.0.0</span>
  `
}
```

Update styling:
```css
.header {
  border-bottom: 3px solid #0066cc;  // Different color
}

h1 {
  color: #0066cc;  // Blue instead of red
}

.version-badge {
  background: #0066cc;
}
```

### 5. src/main.single-spa.ts
Update console logs:
```typescript
console.log('[Angular 21] Bootstrap', props);
console.log('[Angular 21] Mount', props);
console.log('[Angular 21] Unmount', props);
```

### 6. src/app/app.module.ts
```typescript
providers: [
  { provide: APP_BASE_HREF, useValue: '/angular21/' }  // Change base href
]
```

---

## Method 2: Quick Script (Recommended)

Create a file `create-angular21.sh`:

```bash
#!/bin/bash

# Copy folder
cp -r angular16-app angular21-app
cd angular21-app

# Update package.json (requires jq or manual edit)
sed -i '' 's/"angular16-app"/"angular21-app"/g' package.json angular.json
sed -i '' 's/4201/4202/g' package.json angular.json
sed -i '' 's/"@angular\/\([^"]*\)": "\^16\.[^"]*"/"@angular\/\1": "^21.0.0"/g' package.json

# Update webpack
sed -i '' 's/@spa\/angular16/@spa\/angular21/g' webpack.config.js

# Update component
sed -i '' 's/Angular 16/Angular 21/g' src/app/home/home.component.ts
sed -i '' 's/16\.0\.0/21.0.0/g' src/app/home/home.component.ts
sed -i '' 's/#dd0031/#0066cc/g' src/app/home/home.component.ts

# Update main
sed -i '' 's/\[Angular 16\]/[Angular 21]/g' src/main.single-spa.ts

# Update app module
sed -i '' 's/angular16/angular21/g' src/app/app.module.ts

echo "✅ Angular 21 app created!"
echo "Run: cd angular21-app && npm install"
```

Then run:
```bash
chmod +x create-angular21.sh
./create-angular21.sh
```

---

## Verification

After creation, verify these differences:

| Aspect | Angular 16 | Angular 21 |
|--------|------------|------------|
| Folder | `angular16-app` | `angular21-app` |
| Port | 4201 | 4202 |
| Import name | `@spa/angular16` | `@spa/angular21` |
| Angular version | 16.x | 21.x |
| Display text | "Angular 16 App" | "Angular 21 App" |
| Color theme | Red (#dd0031) | Blue (#0066cc) |
| Base href | `/angular16/` | `/angular21/` |

---

## Quick Test

```bash
cd angular21-app
npm install
npm start

# Should see:
# ✔ Compiled successfully.
# ** Angular Live Development Server is listening on localhost:4202 **
```

Open http://localhost:4202 - should see Angular 21 app standalone!

---

**That's it!** Now you have both Angular 16 and Angular 21 apps ready for single-spa integration.
