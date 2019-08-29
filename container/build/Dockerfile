FROM node:12.4.0-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY ./packages/common/package.json ./packages/common/package.json
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/web/package.json ./packages/web/package.json

RUN yarn

COPY . .

ENV RAILS_ENV $RAILS_ENV

#SERVER
ENV SERVER_PORT="4000"
ENV SERVER_ADDRESS="http://localhost"

#SESSION
ENV SESSION_SECRET="theytook'erjobs"

#CORS
ENV CORS_ORIGIN="http://localhost:3000"

#REDIS
ENV REDIS_HOST="redis"

#DATABASE
ENV DB_HOST="db"
ENV DB_PORT="5432"
ENV DB_USERNAME="test"
ENV DB_PASSWORD="test"
ENV DB_NAME="test"

#API KEYS

#EMAIL
ENV COMPANY_NAME="MARKLAR BOOKS"
ENV EMAIL_SERVICE="gmail"
ENV EMAIL_USERNAME="mk180988@gmail.com"
ENV EMAIL_PASSWORD="Battlefield88"
ENV COMPANY_EMAIL="marklar@test.com"

#CORS
ENV FRONTEND_HOST="http://localhost:3000"

CMD ["yarn",  "build"]
