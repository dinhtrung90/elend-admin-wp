# build environment
FROM node:lts-alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./env.sh .
COPY .env.template .env
EXPOSE 8088

# Make our shell script executable
RUN chmod +x env.sh

CMD ["nginx", "-g", "daemon off;"]