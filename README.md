# A Periodic Table and Compound API
A node js api utilizing express, mongoose, and MongoDb

## Setup
1. set up a MongoDb database, local or Atlas
2. create a .env file with these values: 
 - DB_URI : mongo database connection string
 - PORT : localhost port
 - LOG_LEVEL : level for logs ex. debug
3. ```npm install```
4. ```npm start```

## Endpoints
### Elements:
 - POST /elements : start with this endpoint in order to set up the database with elements (element list already provided)
 - GET /elements : get the full list of elements
 - GET /elements/:number : get an element by its atomic number
 - GET /elements/group/:group : get all elements in a certain group
 - DELETE /elements : clean up database (deletes all)

### Compounds:
 - POST /compounds : create a compound
 - GET /compounds : get a full list of compounds
 - GET /compounds/:id : get a compound by its id
 - GET /compounds/formula/:formula : get compounds with a specific formula
 - PUT /compounds/:id : update a compound by its id
 - DELETE /compounds/:id : delete a compound by its id
