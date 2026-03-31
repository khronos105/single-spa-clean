# Angular 16 App Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for production as SystemJS module
RUN npm run build:single-spa

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/dist/angular16-app /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4201
EXPOSE 4201

CMD ["nginx", "-g", "daemon off;"]
