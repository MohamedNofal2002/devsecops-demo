# Old, end-of-life base image on purpose so the image scanner finds issues.
FROM node:16-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
