# syntax=docker/dockerfile:1

# --- Install dependencies (cached layer) ---
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 300000

# --- Build CRA production bundle ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Baked into the JS bundle at build time (browser calls this URL)
ARG REACT_APP_API_URL=http://localhost:3004
ENV REACT_APP_API_URL=$REACT_APP_API_URL \
    NODE_ENV=production \
    GENERATE_SOURCEMAP=false

RUN yarn build

# --- Serve static `build/` (SPA fallback for react-router BrowserRouter) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN npm install -g serve@14.2.4

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
