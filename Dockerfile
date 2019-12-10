FROM node:10-alpine
MAINTAINER Aldo Bernardes Maciel

# build view
WORKDIR /app/view
COPY *.json /app/view/
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g
RUN npm install
COPY view/src /app/view/src
COPY view/public /app/view/public
RUN npm run build

# build server
WORKDIR /app
COPY *.json /app/
COPY src /app/src
RUN npm run build

# run
RUN echo 'set -e' >> /boot.sh

# daemon for cron jobs
RUN echo 'crond' >> /boot.sh

#RUN echo 'npm install --production' >> /boot.sh

# npm start, make sure to have a start attribute in "scripts" in package.json
RUN echo 'sleep 5' >> /boot.sh
CMD sh /boot.sh && npm run start
