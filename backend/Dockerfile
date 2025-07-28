# Use a slim Node.js LTS image for a smaller footprint
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# --- CRITICAL STEP: Pre-cache the NLP model ---
# This runs the script to download the model into the image layer.
# When the container runs later, it will find the model in its cache
# and will NOT require internet access.
RUN node scripts/pre-cache-model.js

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]