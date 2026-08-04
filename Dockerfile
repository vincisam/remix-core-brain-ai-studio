# Minimal Dockerfile to run the compiled server from dist/
# Uses Node 24 slim image to match local dev runtime
FROM node:24-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install production dependencies only
COPY package.json package-lock.json ./
# Use a permissive install to avoid lockfile format/peer-deps failures on Render's build environment.
# Try a fast 'npm ci' style install, fall back to 'npm install --production --legacy-peer-deps' if it fails.
RUN set -eux; \
    if npm ci --only=production; then exit 0; else npm install --production --legacy-peer-deps; fi

# Copy the rest of the repository
COPY . .

# Ensure the dist bundle exists — this project ships compiled server.mjs in dist/
# Expose the port that the server listens on
EXPOSE 3000

# Run the prebuilt server bundle
CMD ["node", "dist/server.mjs"]
