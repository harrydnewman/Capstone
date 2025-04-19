# Use Node LTS Alpine for smaller image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port (optional, for documentation)
EXPOSE 3100

# Run the server
CMD ["node", "server.js"]
