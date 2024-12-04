FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN MKDIR /dist/uploads

EXPOSE 4000

CMD [ "npm","run", "start" ]