# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install build essentials for better-sqlite3 (can be heavy, so we use multi-stage)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

# Final stage
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]
