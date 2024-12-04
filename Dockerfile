FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p dist/uploads

EXPOSE 4000

CMD [ "npm","run", "start" ]