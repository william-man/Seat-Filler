To install locally: clone the repo and use "npm install" to download all dependancies.
To run the project, use the command "npm run dev".
Access to MongoDB requires a dev token; reach out to @william-man for access.

The purpose of this project was to imitate a cinema booking website that allows the user
to purchase tickets, register an account and browse a catalogue of films available for viewing.

Objectives:
Frontend
-create a home page, catalogue, signup, login and purchasing pages
-fetch film data from the database to display it on the catalogue page

Backend
-connect routes to the frontend and to MongoDB queries to allow for CRUD opertaions.
-create a user authentication to allow users to sign up and register for an account.

Methods:

Used React to create the layout for each page and react-router-dom v6 to handle clientside routing between pages.
Examples of usage can be found in /frontend/index. To fetch data, axios was used in combination with redux to have 
better and more consistent control on how data is received (whether success or failure). This can be found in a "slice" file
of a feature in /frontend/src/features/.

For the backend, Express was used to handle routing and http requests; testing requests was done via Postman.
To create a user authentication, an authentication middleware was created in /backend/middleware/ using 
jasonwebtoken and bcrypt for hashing passwords in userControllers.


22/8/22 - 28/9/22
Began project. Packages installed:
-express (backend framework to handle html requests)
-dotenv (to be able to use environment variables)
-mongoose (to connect to mongodb)
-colors (highlight console messages)
-express-async-handler (to assist with building asynchronous functions to database)
-nodemon (monitor and update changes live during backend development)

29/8/22 - 4/9/22
Installed react for frontend.
-concurrently
-jest

5/9/22 - 11/9/22
Installed Redux for statemanagement
Created boiler plates for home page and film page.
Connected backend data fetching for films to frontend.

12/9/22 - 25/9/22
Installed bcrypt and jwt
Built admin controllers and user login/register controllers.

Hosted on onrender.com
