# Updated Dockerfile to remove backend stage
# Stage 1: Build React App
FROM node:23 AS frontend

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the React app files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Nginx Server
FROM nginx:alpine AS nginx

# Copy React build files into NGINX web root
COPY --from=frontend /app/build /usr/share/nginx/html

# Copy your custom NGINX config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
