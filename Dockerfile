FROM node:lts-alpine3.15 AS installing

WORKDIR /app
COPY . .
RUN yarn --no-progress --non-interactive --prefer-offline --pure-lockfile --silent

FROM installing AS building

RUN yarn build

ENV TZ Europe/Moscow
ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8

CMD ["yarn", "start:prod"]
