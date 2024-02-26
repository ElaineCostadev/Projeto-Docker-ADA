FROM node:16.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm start

# CMD ["node", "index.js"]
CMD ["npm", "start"]

EXPOSE 3001