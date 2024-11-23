FROM node:18-alpine AS builder
WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest AS stage-1
EXPOSE 5173
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]