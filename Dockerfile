# Old, end-of-life base image on purpose so the image scanner finds issues.
FROM node:14-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
