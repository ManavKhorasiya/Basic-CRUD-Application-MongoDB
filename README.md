# MongoDB CRUD Application 

NodeJS + MongoDB App handling all CRUD operations with Docker Deployment

## Notes 

### Without Docker 

When docker is not used, then the app is running locally on default ports specified in `.env` file which are : 
|PORT|Usage|
|---------|--------|
|3000|Running Node Express Server|
|27017|Running MongoDB Database|

So the connection strings are : 
 * `$HOST:3000` (currently `localhost:3000`)
 * `mongodb://localhost:27017/` 

### With Docker

When docker is enabled, we require 2 diff containers to run at the same time - one running the MongoDB database and the other running Node Express Server

The info for the Server container is stored in `Dockerfile` where details related to starting of server and installing `npm` scripts are stored.

The info for `mongo` container and environment variables for server is stored in `docker-compose.yml`. Here we have specified that port `5000` of <b>container</b> be mapped to port `8080` of <b>machine</b> at run time.

The port details are : 
|PORT|Usage|
|---------|--------|
|8000|Specified in `Dockerfile` to Inform docker that container is listening at specified port at runtime|
|8080|Machine's port 8080 used to bind to container|
|5000|Container's port mapped to specified machine port(currently `8080`)|
|27017|Machine's port runnning MongoDB|
|27019|Docker Container's MongoDB port mapped to local machine's MongoDB port(currently  `27017`)|

So the connection strings are :
 * `$HOST:5000` (currently `localhost:5000`)
 * `mongodb://database:27017/` (Here `databse` is name of <b>container</b> running MongoDB)

#### Connect to MongoDB Compass

Connection String : `mongodb://localhost:27019/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`

Here, `27019` is the port on which <b>Mongo container</b> is running


## Usage

Clone the repository

Run `npm install` to install all dependencies stored in `package.json`

### Without Docker
Run `npm start`
* Connection base URL : `http://localhost:3000/api/`
* MongoDB Connection URL : `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false` 

### With Docker
Pull mongo image by running : `docker pull mongo:latest`

While running 1st time, docker containers have to be built. 

So run `docker-compose up --build`
* Connection base URL : `http://localhost:5000/api/`
* MongoDB Connection URL : `mongodb://localhost:27019/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`

After building containers, to run the program, use : 
`docker-compose up`

## Useful Commands

* Remove composed mongo container(container name : <b>database</b>) : `docker-compose rm database`

## References
https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3
