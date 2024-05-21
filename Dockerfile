FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# # Update and upgrade the package manager
# RUN app-get update && apt-get upgrade

# Copy package.json and yarn.lock to the working directory
COPY package.json package.json


# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm install

RUN yarn --cwd ./Sources/Passkey cache clean
RUN yarn --cwd ./Sources/Passkey install

# Expose the port the app will run on
EXPOSE 3000

# Start the app
# RUN cd carbon/carbon-tutorial
# ENV RPS_FQDN application-f8.15n1uzmexb0c.au-syd.codeengine.appdomain.cloud
# ENV RPS_FQDN secure.localhost
ENV SERVER_PORT 5000
CMD yarn --cwd ./Sources/Passkey start --disableHostCheck
