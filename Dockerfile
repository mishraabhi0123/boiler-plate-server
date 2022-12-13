FROM node:18 as DEV
WORKDIR /home/ubuntu/app

COPY package.json .
COPY .env.sample .
RUN cp .env.sample .env
RUN npm i
RUN npm i -g nodemon

COPY . .
CMD [ "nodemon" ]