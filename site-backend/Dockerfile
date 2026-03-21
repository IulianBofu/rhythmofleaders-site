FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

# Persistent data dir (mapped to Docker volume)
# Backend writes posts.json, reservations.json, retreat-config.json to cwd
# We symlink them into /app/data so they survive container rebuilds
RUN mkdir -p /app/data && \
    rm -f posts.json reservations.json retreat-config.json && \
    ln -s /app/data/posts.json posts.json && \
    ln -s /app/data/reservations.json reservations.json && \
    ln -s /app/data/retreat-config.json retreat-config.json

EXPOSE 4000

CMD ["node", "index.js"]
