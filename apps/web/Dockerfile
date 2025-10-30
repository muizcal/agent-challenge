# Stage 1: Build Next.js app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only package files first (better caching)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm@9 && pnpm install

# Copy all source code
COPY . .

# Build the app
RUN pnpm build

# Stage 2: Production image
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Next.js output
COPY --from=builder /app/.next /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
