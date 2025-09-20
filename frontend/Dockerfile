FROM node:20.19.5 AS build
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build

FROM nginx:1.29.1
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .