FROM node:20-alpine
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install
RUN pnpm --filter @catalogue/web build
EXPOSE 5173
CMD ["pnpm","--filter","@catalogue/web","dev","--host","0.0.0.0"]
