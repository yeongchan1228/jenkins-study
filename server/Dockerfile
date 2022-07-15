FROM node

WORKDIR /user/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "run", "start" ]