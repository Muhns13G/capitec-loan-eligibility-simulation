# Base image
FROM node:20-alpine AS base

# Stage 1: Install ONLY production dependencies (for runtime)
FROM base AS deps
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

# Temporarily delete the prepare script → prevents husky from running
RUN npm pkg delete scripts.prepare && \
    npm ci --only=production && \
    npm cache clean --force

# Stage 2: Install ALL dependencies (including devDeps like TypeScript) for building
FROM base AS builder-deps
WORKDIR /app

COPY package.json package-lock.json ./

# Delete prepare here too (optional but consistent)
RUN npm pkg delete scripts.prepare && \
    npm ci

# Stage 3: Build the Next.js app
FROM base AS builder
WORKDIR /app

COPY --from=builder-deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Stage 4: Final production image (tiny & secure)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only what's needed from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]