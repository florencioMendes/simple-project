FROM node:18-alpine AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
RUN npm install --global pm2
COPY . .

EXPOSE 3000
USER node
CMD [ "pm2-runtime", "start", "--name", "server-express", "--", "./app.js" ]
