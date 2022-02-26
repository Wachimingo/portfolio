FROM node:16.14.0-alpine
ENV PORT 3000


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN npm run build
EXPOSE 3000

CMD [ "npm", "--inspect=9229" , "start" ]