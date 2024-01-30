FROM node:21.6.0-bookworm-slim as build
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile
COPY . ./
RUN pnpm run build
# =====================================
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]