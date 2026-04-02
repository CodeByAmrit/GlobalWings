# STAGE 1: Build & Compile
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

# Copy package manifests
COPY package*.json ./

# Install ALL dependencies (including dev for compilation)
RUN npm install

# Copy application source
COPY . .

# Run Tailwind CSS build (Production)
RUN npm run build:css

# STAGE 2: Production Runtime
FROM node:24-alpine

# Set build metadata
LABEL maintainer="Amrit Sharma"
LABEL version="1.1.0"
LABEL description="Production grade GlobalWings platform image"

# Set environment
ENV NODE_ENV=production
ENV PORT=8001

# Set working directory
WORKDIR /app

# Create necessary directories and set ownership before switching users
RUN mkdir -p database && chown -R node:node /app

# Copy production artifacts from builder
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app ./

# Switch to non-privileged user for security
USER node

# Expose the correct application port
EXPOSE 8001

# Healthcheck to ensure system availability
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8001/', (res) => res.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Start the application
CMD ["npm", "start"]
