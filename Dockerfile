FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /submission

COPY package.json /submission/package.json

RUN npm install

COPY . /submission/

ENTRYPOINT [ "node",  "./bin/index.js" ]
