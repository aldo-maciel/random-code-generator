FROM node:10.15.2
MAINTAINER Aldo Bernardes Maciel

# build server
WORKDIR /app/server
COPY /server/*.json /app/server/
RUN npm install
COPY /server/src /app/server/src
RUN npm run build

# build view
WORKDIR /app/view
COPY *.json /app/view/
RUN npm install
COPY src /app/view/src
COPY public /app/view/public
RUN npm run build

# run
WORKDIR /app
ENTRYPOINT node /app/server/dist/server.js
EXPOSE 3001
