#Use official image as base parent image
FROM node:12

#Set up working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Copy the file from host to current location
COPY package*.json ./

#Run the command inside your image file system
RUN npm install
# RUN npm install cors
# RUN npm install mongoose --save
# RUN npm install mongodb
# RUN npm install bcrypt

#Copy rest of source code from host to image filesystem
COPY . .

#Inform docker that container is listening at specified port at runtime
EXPOSE 8080

#Run specified command within container
CMD [ "npm", "start" ]

