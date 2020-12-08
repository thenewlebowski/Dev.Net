# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# Set the working directory to /server
WORKDIR /server
# Copy package*.json (both regular and lock file)
COPY /package*.json /server/
# install dependencies
RUN npm install
#install nodemon globally
RUN npm install nodemon -g
# Make port 5000 available to the world outside this container
EXPOSE 5000
# Run the app when the container launches
CMD [ "npm", "start" ]