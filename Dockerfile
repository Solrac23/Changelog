FROM node:lts-alpine3.17 as base

WORKDIR /usr/app
COPY package*.json .
COPY prisma ./prisma/
COPY .env ./
EXPOSE 3355-3356

FROM base as dev
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "dev"]