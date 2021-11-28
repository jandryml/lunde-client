FROM node:16.3.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY ./ ./

RUN npm install
CMD ["npm", "run", "start"]