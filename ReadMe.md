# Challenge Renti

This corresponds to the Renti Challenge and how I have solved it:

- [Challenge Renti](#challenge-renti)
  - [Start](#start)
    - [Deploy](#deploy)
    - [Local Test](#local-test)
  - [Architecture](#architecture)
    - [Frontend Architecture](#frontend-architecture)
    - [Backend Architecture](#backend-architecture)
  - [Problems](#problems)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Nice to have - future](#nice-to-have---future)
    - [Unit tests](#unit-tests)
      - [Backend Unit Test](#backend-unit-test)
      - [Frontend Unit Test](#frontend-unit-test)
    - [End to end tests](#end-to-end-tests)

## Start

### Deploy

You can see the page in:

API - <https://renti-library-api.herokuapp.com> (connected to MongoDB Atlas)

Web App -  <https://renti-library-app.herokuapp.com> - If is not working, please test local im working on that rn

Github repo - <https://github.com/leaiannotti/renti-challenge>

### Local Test

To test them locally in development environment use:

```bash
npm run install && npm run start-dev
```

Both are with the default configuration. Backend port 61535, front end is html static with js vanilla (client-vanilla/login.html).

Due to lack of time the api is hardcoded on the front end. If you want to test it local, change to http:localhost:61535

## Architecture

![arquitectura](https://github.com/leaiannotti/renti-challenge/blob/master/server/assets/renti-challeng-arch.png?raw=true)

### Frontend Architecture

- Static HTML with JS vanilla and bootstrap.

Sorry for the little technological stack here, I started the project in react but due to lack of time I had to leave it halfway.
My idea was

- React with Typescript
- SASS with CSS.
- Unit test with jest.
- End to end test cypress.

### Backend Architecture

- NodeJS , using express.
- API REST.
- MongoDB .

Inside the server/postman folder is the collection of endpoints that was used to test the backend
You can change the variable to test in PROD or DEV

## Problems

### Backend

I had several problems that I was solving throughout the manual tests. Some of them were

- The use of CORS as a middleware, I had included it after the definition of the routes but I had to go before since I am using a middleware to validate the JWT there.
- Validation of the JWT and save the role within it so that later it can be redirected to the correct page from the frontend. There are some deprecated versions of express-jwt.
- The creation of my own custom id to preserve the CSV values and that mongodb does not overwrite it with the ObjectID

### Frontend

- At first I decided to do it in React, but I set out to do it in a short time. My priority was the backend, until I understood that if I didn't have a frontend there was no way to test it.
- The functions of borrowing a book or returning it are not working correctly on the frontend
- I decided to make a first vanilla version with bootstrap so I have something to deliver but happy to do it in React in the future.

## Nice to have - future

### Unit tests

#### Backend Unit Test

Try to use Jest.
Mock the result of axios from the front end for the consumption of the API and carry out unit tests of the functionalities.

#### Frontend Unit Test

Also think about using Jest.

Prioritize the sense and quality of the test (that it renders and presents the most important parts, in addition to not presenting changes in the past –with snapshots–), before the quantity.
Currently there is a performance problem when getting the books

The front end has validations that are not tested.

### End to end tests

Think about using Cypress. Test the operations in the role validation range.
