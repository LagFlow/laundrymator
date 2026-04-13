#Build stage
FROM node:25-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt application
RUN npm run generate

#Serve stage
FROM nginx:stable-alpine AS production-stage

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the build stage to the nginx html directory
COPY --from=build-stage /app/.output/public /usr/share/nginx/html

# Copy our custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
