FROM node:24-alpine AS builder
WORKDIR /app

# Enable the latest pnpm via corepack for deterministic installs
RUN corepack enable && corepack prepare pnpm@latest --activate

# Only copy lockfiles first to maximize Docker layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the full workspace and build the production bundle
COPY . .
RUN pnpm run build

FROM node:24-alpine AS runner
WORKDIR /app

# Bring over the built server output
COPY --from=builder /app/.output ./

CMD ["node", "server/index.mjs"]
