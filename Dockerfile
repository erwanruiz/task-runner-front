# syntax=docker/dockerfile:1
FROM node:20-alpine

# Use the existing node user (uid:gid 1000:1000)
USER root

WORKDIR /app

# Change ownership of the working directory to node user
RUN chown -R node:node /app

# Switch to node user
USER node

# Copy package files and install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force

# Copy the rest of the application code
COPY --chown=node:node . .

# Environment variables
ENV HOST=0.0.0.0 \
    PORT=3000 \
    NITRO_PORT=3000 \
    NUXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host", "0.0.0.0"]
