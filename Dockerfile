FROM node:lts-alpine3.17

WORKDIR /usr/app

COPY package*.json .
COPY prisma ./prisma/
COPY .env ./

RUN npm install
RUN npx prisma generate
COPY . .

EXPOSE 3355-3356

CMD ["npm", "run", "dev"]