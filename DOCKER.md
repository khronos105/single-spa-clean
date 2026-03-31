# 🐳 Docker Deployment Guide

Complete guide to running the Single-SPA microfrontend architecture in Docker containers.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│   Host Machine                              │
│   ┌───────────────────────────────────┐    │
│   │  Docker Network: spa-network      │    │
│   │                                   │    │
│   │  ┌──────────────────────────┐    │    │
│   │  │ root-config              │    │    │
│   │  │ Port: 9000               │    │    │
│   │  │ nginx (Alpine)           │    │    │
│   │  └──────────────────────────┘    │    │
│   │            ↓                      │    │
│   │  ┌──────────────────────────┐    │    │
│   │  │ angular16                │    │    │
│   │  │ Port: 4201               │    │    │
│   │  │ nginx (Alpine)           │    │    │
│   │  └──────────────────────────┘    │    │
│   │                                   │    │
│   └───────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

---

## ⚡ Quick Start

### 1. Build and Start All Services

```bash
docker-compose up --build
```

This will:
- ✅ Build root-config image
- ✅ Build angular16 image
- ✅ Create spa-network
- ✅ Start all containers
- ✅ Expose ports 9000, 4201

### 2. Access the Application

Open your browser:
- **Root Config:** http://localhost:9000
- **Angular 16:** http://localhost:4201/main.js (direct access)

### 3. Test Navigation

- Click "Angular 16" in the navigation
- App should load via SystemJS
- Check browser console for logs

---

## 🛠️ Available Commands

### Start Services (Detached)
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose stop
```

### Stop and Remove Containers
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f root-config
docker-compose logs -f angular16
```

### Rebuild After Code Changes
```bash
docker-compose up --build
```

### Clean Everything (including images)
```bash
docker-compose down --rmi all --volumes
```

---

## 📦 Container Details

### Root Config Container

**Name:** `spa-root-config`  
**Base Image:** `node:20-alpine` (builder) + `nginx:alpine` (runtime)  
**Port:** 9000  
**Build Time:** ~30-60 seconds  
**Size:** ~25 MB

**What it does:**
- Builds the root-config JavaScript bundle
- Serves static files via nginx
- Provides SystemJS orchestration
- Registers microfrontends

### Angular 16 Container

**Name:** `spa-angular16`  
**Base Image:** `node:20-alpine` (builder) + `nginx:alpine` (runtime)  
**Port:** 4201  
**Build Time:** ~2-4 minutes  
**Size:** ~35 MB

**What it does:**
- Builds Angular 16 as SystemJS module
- Serves main.js and assets via nginx
- Enables CORS for cross-origin loading
- Provides Zone.js isolation

---

## 🔧 Configuration

### Dynamic Import Maps

The root-config automatically detects the browser's hostname and uses it for import maps:

```javascript
// Browser at localhost:9000
"@spa/angular16": "http://localhost:4201/main.js"

// Browser at 192.168.1.100:9000
"@spa/angular16": "http://192.168.1.100:4201/main.js"
```

This ensures the app works on:
- ✅ localhost
- ✅ Local network IPs
- ✅ Docker host IPs
- ✅ Production domains

### CORS Configuration

Both nginx configurations enable CORS to allow SystemJS imports:

```nginx
add_header 'Access-Control-Allow-Origin' '*' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
```

---

## 🐛 Troubleshooting

### Issue: Containers won't start

**Check ports:**
```bash
# macOS/Linux
lsof -i :9000
lsof -i :4201

# Or use docker-compose
docker-compose ps
```

**Solution:** Kill processes using those ports or change ports in docker-compose.yml

### Issue: Angular 16 app doesn't load

**Check container logs:**
```bash
docker-compose logs angular16
```

**Check if file exists:**
```bash
docker exec spa-angular16 ls -la /usr/share/nginx/html/
```

**Expected files:**
- main.js
- index.html
- polyfills files

### Issue: Build fails

**Check Node version in Dockerfile:**
```dockerfile
FROM node:20-alpine
```

**Clear Docker cache:**
```bash
docker-compose build --no-cache
```

### Issue: Network errors between containers

**Check network:**
```bash
docker network inspect single-spa-clean_spa-network
```

**Ensure all containers are on same network:**
```bash
docker-compose ps
```

---

## 📊 Production Considerations

### Optimization Tips

1. **Multi-stage builds** - Already implemented (builder + runtime)
2. **Alpine images** - Using alpine for smaller size
3. **nginx caching** - Configured for static assets
4. **CORS headers** - Enabled for microfrontend loading

### Security

Current setup:
- ⚠️ CORS allows all origins (`*`) - For development
- ✅ No root user in containers
- ✅ Minimal base images (Alpine)

**For production:**
```nginx
# Replace * with specific domains
add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com' always;
```

### Environment Variables

To customize URLs without rebuilding:

**docker-compose.yml:**
```yaml
environment:
  - ANGULAR16_URL=https://cdn.example.com/angular16
  - ANGULAR21_URL=https://cdn.example.com/angular21
```

Then use a startup script to replace placeholders in index.html.

---

## 🚀 Deployment Options

### Option 1: Docker Compose (Single Host)

**Use case:** Testing, small deployments

```bash
docker-compose up -d
```

### Option 2: Kubernetes

**Use case:** Production, scaling, HA

Convert docker-compose.yml to Kubernetes manifests:
```bash
kompose convert
```

### Option 3: Docker Swarm

**Use case:** Multi-host orchestration

```bash
docker stack deploy -c docker-compose.yml spa
```

### Option 4: Cloud Services

- **AWS:** ECS, Fargate
- **Azure:** Container Instances
- **GCP:** Cloud Run
- **Heroku:** Container Registry

---

## 📋 Build Process Explained

### Root Config Build

1. **Stage 1: Builder**
   - Install Node.js dependencies
   - Run `npm run build`
   - Output to `dist/`

2. **Stage 2: Runtime**
   - Copy built files to nginx html directory
   - Configure nginx to serve on port 9000
   - Enable CORS

### Angular 16 Build

1. **Stage 1: Builder**
   - Install dependencies (including Angular CLI)
   - Run `npm run build:single-spa`
   - Output SystemJS module to `dist/angular16-app/`

2. **Stage 2: Runtime**
   - Copy built files to nginx html directory
   - Configure nginx with CORS
   - Serve main.js on port 4201

---

## 🧪 Testing in Docker

### 1. Build Images
```bash
docker-compose build
```

### 2. Start Services
```bash
docker-compose up
```

### 3. Open Browser
Navigate to http://localhost:9000

### 4. Expected Behavior

✅ **Console logs:**
```
✅ Single-SPA root-config initialized
📍 Registered applications:
   - @spa/angular16 (route: /angular16) - Angular 16
```

✅ **Network tab:**
- `http://localhost:4201/main.js` loads successfully
- No CORS errors

✅ **UI:**
- Welcome screen displays
- Click "Angular 16" → App loads
- Counter button works

---

## 📈 Monitoring

### Container Health

```bash
# Check container status
docker-compose ps

# Check resource usage
docker stats

# Check container logs
docker-compose logs -f
```

### Application Health

**Root Config:**
```bash
curl http://localhost:9000
```

**Angular 16:**
```bash
curl -I http://localhost:4201/main.js
```

Expected: `200 OK`

---

## 🎓 Next Steps

1. **Add Angular 21** - Create angular21 service in docker-compose.yml
2. **Add CI/CD** - GitHub Actions to build and push images
3. **Add Health Checks** - Docker HEALTHCHECK directive
4. **Add Logging** - Centralized logging (ELK, Splunk)
5. **Add Metrics** - Prometheus + Grafana

---

## 📚 Resources

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [nginx Docker Image](https://hub.docker.com/_/nginx)

---

**Status:** ✅ Production-ready Docker setup  
**Last Updated:** March 31, 2026  
**Tested:** macOS Docker Desktop

---

**Ready to deploy to any Docker-enabled environment! 🐳**
