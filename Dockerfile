FROM node:12.19.0-alpine3.9

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN ls

RUN npm install

RUN npm build 

CMD ["node", "dist/main"]
