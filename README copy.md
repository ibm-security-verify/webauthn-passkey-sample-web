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
