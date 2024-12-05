FROM node:18.13.0
WORKDIR /app
COPY . .
RUN npm install
# EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

### for Static Website use following Dockerfile

# Use a lightweight Node.js image to build the application
# FROM node:18 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build 

# # Use a lightweight web server to serve the application
# FROM nginx:alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]