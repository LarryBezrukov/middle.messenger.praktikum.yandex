FROM node:16-alpine
WORKDIR /var/www/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod
EXPOSE 3000
CMD ["node", "./app.js"]