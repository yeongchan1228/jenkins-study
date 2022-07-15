FROM node

WORKDIR /

COPY . /

ARG env
ENV APP_ENV=$env 
RUN npm install
RUN npm run build

EXPOSE 80

CMD [ "node","./dist/index.js" ]