FROM nginx
COPY "etc/conf.nginx" "/etc/nginx/nginx.conf"
RUN mkdir "/app"
WORKDIR "/app"

COPY "./build/web" "/app/"
EXPOSE 9090
