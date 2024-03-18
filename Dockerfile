FROM node:18.19.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm install next

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
