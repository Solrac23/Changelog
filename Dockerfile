FROM node:lts-alpine3.17 as base

WORKDIR /usr/app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY .env ./
EXPOSE 3355-3356

FROM base as dev
RUN npm i -g pnpm@latest
RUN pnpm i
COPY . .
RUN pnpm prisma generate
CMD ["pnpm", "dev"]