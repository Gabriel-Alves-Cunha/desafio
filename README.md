## Main Structure Of This Repository

```
.
├── Dockerfile
├── package.json
├── src
│	  ├── api/
│	  ├── app.ts
│	  ├── controllers/
│	  ├── router.ts
│	  ├── server.ts
│	  └── validation/
├── swagger.json
├── tests
│	  └── routes
```

The folder "src/" contains the source code for the API. It is subdivided
into the folders:
* "src/api/": The API that our API needs to access to implement our logic.
* "src/controllers/": The functions that controll what happens at each route.
* "src/validation/": Functions that are meant to validate user input.
and the files:
* "src/app.ts": Creation of the base for the server.
* "src/server.ts": Creation of the server.

Outside, on the root directory, we have the following files:
* "swagger.json": The OpenApi 3.0 documentation for this project.
* "package.json": File containing scripts to help create a Docker container, build the project, test and develop it.
* "Dockerfile": The file that instructs Docker how to build a proper container.

<br/>

---
<br/>

## Build Project And Docker Container

Assuming you have Docker, Yarn and Node installed on your machine, you first have to build the project (it does not have any dependencie on any native binary), so, run on your terminal:

``` sh
yarn build:app
```
If you want to run the app:
``` sh
yarn start
```
Once yarn is successfull to build the app, type this to build a docker container:
``` sh
sudo docker build . -t desafio
```
You should have a docker image now. To run it type:
``` sh
sudo docker run -p 3000:3000 -d desafio
```
Then you can test it on your browser the url: "http://127.0.0.1:3000/top-geo-shopping" and you should have a JSON response.

In order to kill the running container, just type:
``` sh
sudo docker kill <docker-id>
```
