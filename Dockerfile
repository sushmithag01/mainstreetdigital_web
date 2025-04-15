# Use the official Node.js 16.20.2 image as the base image
FROM node:16.20.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .
RUN npm run build
# Expose port 8000 to the outside world
EXPOSE 8000

# Command to run your application
CMD ["node", "server/index.js"]