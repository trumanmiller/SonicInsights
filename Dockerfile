FROM node:18 AS build-stage

# copy, install and build client
WORKDIR /usr/app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# copy and install server
FROM node:18 AS production-stage

WORKDIR /usr/app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the backend application dependencies
RUN npm install

# Copy the backend code
COPY ./ ./

# Copy the build output from the first stage

# Expose the port that the application will run on
EXPOSE 3000

# Start the backend server
CMD [ "node", "server/server.js" ]
