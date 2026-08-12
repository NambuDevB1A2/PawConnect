FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
RUN pnpm install --frozen-lockfile

FROM base AS build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_AZURE_STORAGE_DOMAIN
ARG NEXT_PUBLIC_AZURE_PUBLIC_CONTAINER
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_AZURE_STORAGE_DOMAIN=$NEXT_PUBLIC_AZURE_STORAGE_DOMAIN
ENV NEXT_PUBLIC_AZURE_PUBLIC_CONTAINER=$NEXT_PUBLIC_AZURE_PUBLIC_CONTAINER
RUN echo "DEBUG API_URL=[$NEXT_PUBLIC_API_URL]"

COPY --from=deps /app ./
COPY . .
RUN pnpm --filter web build

FROM base AS production
ENV NODE_ENV=production
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]