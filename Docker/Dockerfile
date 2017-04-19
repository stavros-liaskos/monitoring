FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies # copies file from xxxxxx ./html/package.json to the container
COPY html/package.json /usr/src/app/
RUN npm install

# Bundle app source # also here html is a relative path : ./html
COPY html /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]