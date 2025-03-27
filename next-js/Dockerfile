# Multi-stage build

# Step 1: Build the Next.js app
FROM node:latest AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY ./public ./public

RUN rm -rf .next

RUN npm run build

# Step 2: Serve the Next.js app
FROM node:latest

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --production

# Ensure the log directory exists
RUN mkdir -p /var/log/nextjs-app
# Set environment to production
ENV NODE_ENV=production

EXPOSE 3000

# Use shell to handle log redirection
CMD ["sh", "-c", "npm start >> /var/log/nextjs-app/app.log 2>&1"]