//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
import passport from 'passport';
import passportGithub from 'passport-github'; 
import path from 'path';
import express from 'express';
const LOCAL_PORT = 8081;
const DEPLOY_URL = "http://localhost:" + LOCAL_PORT;
const PORT = process.env.HTTP_PORT || LOCAL_PORT;
const GithubStrategy = passportGithub.Strategy;
const app = express();

// server.js -- A simple Express.js web server for serving a React.js app
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});  