# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# Set the working directory to /client
WORKDIR /client
# Copy package*.json (both regular and lock file)
COPY /package*.json /client/
# install dependencies
RUN npm install
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]