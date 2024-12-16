# Multi-stage build

# Step 1: Build the Next.js app
FROM node:latest AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY ./public ./public
RUN npm run build

# Step 2: Serve the Next.js app
FROM node:latest

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --production
EXPOSE 3000

CMD ["npm", "run", "start"]
