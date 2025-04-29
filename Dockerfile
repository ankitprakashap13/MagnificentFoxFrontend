# Updated Dockerfile to remove backend stage
# Stage 1: Build React App
FROM node:23 AS frontend

WORKDIR /app/ux-magnificent-fox

# Install dependencies
COPY ux-magnificent-fox/package*.json ./ux-magnificent-fox/
RUN cd ux-magnificent-fox && npm install

# Copy the rest of the React app files
COPY ux-magnificent-fox ./ux-magnificent-fox

# Build the React app for production
RUN cd ux-magnificent-fox && npm run build

# Stage 2: Nginx Server
FROM nginx:alpine AS nginx

# Copy React build files into NGINX web root
COPY --from=frontend /app/ux-magnificent-fox/build /usr/share/nginx/html

# Copy your custom NGINX config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
