# ==========================================
# STAGE 1: Builder (The Prep Kitchen)
# ==========================================
# We use a Node.js image to install dependencies and compile the code
FROM node:20-alpine AS builder

WORKDIR /app/serene-app

# Copy dependency definition files first (for caching)
COPY package*.json ./

# Install all dependencies (including build tools)
RUN npm ci --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the application (Vite compiles code into static HTML/CSS/JS in the 'dist' folder)
RUN npm run build

# ==========================================
# STAGE 2: Runner (The Serving Table / Web Server)
# ==========================================
# We switch to a lightweight web server (Nginx) to serve the static files
FROM nginx:alpine AS runner

# Copy custom Nginx configuration for reverse-proxying API calls
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled files from Stage 1 into Nginx's default folder
COPY --from=builder /app/serene-app/dist /usr/share/nginx/html

# Expose port 80 (standard HTTP web port)
EXPOSE 80

# Run Nginx in the foreground so the container doesn't immediately exit
CMD ["nginx", "-g", "daemon off;"]