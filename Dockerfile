FROM node:16

WORKDIR /usr/src/bankuish

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 4000

CMD [ "node", "index.js" ]