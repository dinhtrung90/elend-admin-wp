###################################################################
# Build Stage
# The NODE_ENV switch is to ensure that vue-cli is avaliable to use
# for lint and build, but also ensures that it stays in the
# devDependencies block in the package.json, so its not scanned as
# a production dependency by SonarQ
# this stage also allows for the npm install result to be cached and
# reduces the usage of server resources
###################################################################
FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package*.json ./

# Run yarn install
RUN yarn install
COPY . .

# Build the project
CMD ["yarn", "run", "build"]

###################################################################
# Production Stage
# Only includes the bare minimum of resources required to serve the
# static assets in production; nginx and the built assets
###################################################################
FROM nginx:stable-alpine as production-stage

COPY "etc/conf.nginx" "/etc/nginx/conf.d/default.conf"
RUN mkdir -p /home/cc-elend
COPY --from=build-stage /app /home/cc-elend

EXPOSE 8088

CMD ["nginx", "-g", "daemon off;"]