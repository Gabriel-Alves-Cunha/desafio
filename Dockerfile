# A dockerfile must always start by importing the base image.
# We use the keyword 'FROM' to do that.
# In our example, we want import the node image.
# So we write 'node' for the image name and 'lts-alpine' for the version.
FROM node:lts-alpine

ENV NODE_ENV=production

# Next we create a directory to hold the application code
# inside the image, this will be the working directory for your application:
WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn --production

# In order to launch our js code, we must import it into our image.
# We use the keyword 'COPY' to do that.
# The first parameter 'build' is the name of the folder on the host.
# The second parameter '/' is the path where to put the file on the image.
# Here we put the file at the image root folder.
RUN mkdir build
COPY ./build/ ./build/

# Here we expose the port that the js code listens to.
EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

RUN ls -lh
RUN ls -lh ./build/
RUN du -sh

# We need to define the command to launch when we are going to run the image.
# We use the keyword 'CMD' to do that.
CMD ["yarn", "start"]
