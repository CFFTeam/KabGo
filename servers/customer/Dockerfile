FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


EXPOSE 4300

CMD ["npm", "start"]