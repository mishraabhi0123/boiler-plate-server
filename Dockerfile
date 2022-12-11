FROM node:18 as DEV
WORKDIR /home/ubuntu/app

COPY package.json .
COPY .env* .
RUN mv .env.sample .env
RUN npm i
RUN npm i -g nodemon

COPY . .
CMD [ "nodemon" ]