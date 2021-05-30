FROM node:lts AS development
ENV PORT=3000
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY . /app

CMD [ "yarn", "run", "start" ]

FROM development AS builder

CMD [ "yarn", "run", "build" ]

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 8088
