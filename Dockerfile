FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY app.js .

ENV PORT=80
EXPOSE 80

CMD ["npm", "start"]
