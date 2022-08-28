# Main Structure Of This Repository

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
