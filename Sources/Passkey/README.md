# webauthn_web_test

## Project Overview 

This is a very simple web page and server built to test the Relying Party Server built by @craigaps. 

Prerequisite is to have the RPS deployed and accessible via HTTPS - [there is a guide housed here](https://github.com/ibm-security-verify/webauthn-relying-party-server-swift)

When deploying this web page, ensure you follow the FIDO2 specifications, ensuring that your RPS and web app are both deployed on the same domain (i.e. rps.au-syd.cloud.com and webapp.au-syd.cloud.com), served over HTTPS and both added as acceptable origins in your FIDO2 configuration from your provider (IBM Security Verify has a very friendly UI to make these changes if needed.)

### Web page 

* The web page is written in Javascript with React Carbon. Review the readme in `carbon2/carbon-tutorial` for more instructions. 


### Server 

* The server is an express.js server that facilitates axios calls to and from the RPS.
* This server is optional as calls can be made directly to the RPS from the react page - should you wish to do this simply change the API endpoints in the carbon2/carbon-tutorial/src/landing-page directory. 


### Running 

To run this project 
* `cd carbon2/carbon-tutorial` 
* run `yarn install` to install packages 
* run `SERVER_PORT=5000 RPID=secure.localhost  yarn start` ensuring your environment variables are accurate. 
    * the server_port should be the port you are running the web server component on (defined in server.js - default 5000)
    * the rpid should be the hostname of the relying party (default secure.localhost)
* the start script should automatically start the server. TO change this behavior review the relevant command in package.json. 

## Running this project in IBM Code Engine

1. Create a code engine project and deploy your RPS there inside an application
2. Inside the same project, create another application for this web app. 
3. Supply the image as quay.io/langley_millard_ibm/webauthn-site
4. Configure the app to listen on port 3000 
5. Ensure min instances is set to 1, and your configuration has at least 1vCPU and 4GB ram. 
6. Supply the following environment variables; 

    a. RP_FQDN='REPLACE ME' - "the FQDN of the RPS (i.e. application-8t.12890dj1.au-syd.codeengine.ibm.com)"

    b. SERVER_PORT=5000 (if modified, the port of the web server component of the app. If not, port 5000 is the default)

    c. DANGEROUSLY_DISABLE_HOST_CHECK=true to ensure that Code Engine allows cross origin between the proxy and the site. 

6. Click deploy revision. 

---

## Carbon Tutorial

This tutorial will guide you in creating a React app with the [Carbon Design System](https://www.carbondesignsystem.com/). We’ll teach you the ins and outs of using Carbon components, while introducing web development best practices along the way.

Get started by visiting the [tutorial instructions](https://carbondesignsystem.com/developing/react-tutorial/overview/).

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
