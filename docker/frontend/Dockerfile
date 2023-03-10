# The first stage
# Build React static files
FROM node:18-alpine as build
# go to frontend work directory
WORKDIR /app/frontend
# Pm2 is for running the server constantly
RUN npm install --global pm2

# # copy the local package.json to the outside. Remember that we only copied 
# COPY ./frontend/package.json ./
# COPY ./frontend/package-lock.json ./
# # npm install package.json without flooding the console.
# RUN npm ci --silent

# copy frontend over
COPY ./frontend/ ./
# open to port 3000
EXPOSE 3000
# running the command as non-root user in container environment. 
USER node
# Start the app. If this error it probably means you messed up the pathing for the build folder
CMD [ "pm2-runtime", "npm", "--", "start" ]