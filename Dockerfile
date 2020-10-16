FROM tarampampam/node:13-alpine AS build
WORKDIR /app
ADD ./next /app
RUN yarn install
RUN yarn build

FROM nginx AS run
COPY --from=build /app/build/ /usr/share/nginx/html/