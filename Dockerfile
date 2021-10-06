FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install && npm i ts-node-dev --dev

COPY . . 

EXPOSE 3333

CMD ["npm","run" , "dev"]