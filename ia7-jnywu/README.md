# Chiu-Yuan Wu IA7

I am still working on it.

Ia6Eb-env.eba-adiwgzan.us-east-2.elasticbeanstalk.com

# Chapter 19 Elastic Beanstalk Code
This code base captures the state of the speedgolf React app at the end of
Chapter 18. It then goes further by working through the steps in Chapter 19
to deploy the app to AWS Elastic Beanstalk. Per Chapter 19, the repo contains
a "client" directory containing the Chapter 18 React app. That app is deployed
through a simple Express server implemented in server.js in the root directory.
the server.js file is transpiled to server.compiled.js for deployment. The app
can be launched to http://localhost:8081 through the command npm start. When
deployed on AWS EB, the app is served at the URL allocated to your app
instance.

Note: This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app). 

The following info was auto-inserted into this readme by create-react-app:

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
