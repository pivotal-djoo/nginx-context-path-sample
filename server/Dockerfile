FROM node:21.6.0-bookworm-slim
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile
EXPOSE 3000
CMD [ "npx", "ts-node", "/app/server.ts" ]
