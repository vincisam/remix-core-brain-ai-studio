# Minimal Dockerfile to run the compiled server from dist/
# Uses Node 24 slim image to match local dev runtime
FROM node:24-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the repository
COPY . .

# Ensure the dist bundle exists — this project ships compiled server.mjs in dist/
# Expose the port that the server listens on
EXPOSE 3000

# Run the prebuilt server bundle
CMD ["node", "dist/server.mjs"]
