# 2dv513 Assignment 3

> Kenny Ek & Filip Gal

## Setup local environment

### Setup database

Create a mysql database with the relations described in the assignment
submission document (Movie, CastMember, Genre, MovieGenre).

Import the data files provided archived in the `/data` directory to the
database.

### Add environment variables

Copy the `variables.env.example` file in the `/server` directory to a file named
`variables.env` in the same directory (`/server`) and fill out the credentials
for the database you use.

### Install and run the application

Install all dependencies by running from the root directory:

```bash
npm install
```

Run the application by running from the root directory:

```bash
npm start
```

This starts up the client and server. A web browser page should open up
automatically. If not, navigate to http://localhost:3000 in a web browser.
