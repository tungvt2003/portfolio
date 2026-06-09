# Stage 1: build
FROM node:22-slim AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Stage 2: production image
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

COPY prisma ./prisma
RUN node_modules/.bin/prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 9001

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/main"]
