# IBM Security Verify Passkey Sample App

An example implementation of Passkeys using native browser functionality and the IBM Security Verify WebAuthn Relying Party Server.

## Getting started

The resource links in the prerequisites explain and demonstrate how you create a new tenant application and configure the security settings to enable FIDO to be used in the sample app.

### Prerequisites

- Follow the instructions to create a [relying party server](https://github.com/ibm-security-verify/webauthn-relying-party-server-swift/blob/main/README.md)

- Clone the repository. Run this command in a Terminal window:

  ```
  git clone https://github.com/ibm-security-verify/webauthn-relying-party-server.git
  ```
### Configuring the project

After completing the prerequisites, 


### Running the web application in IBM Code Engine

1. Create a code engine project and deploy your RPS there inside an application

2. Inside the same project, create another application for this web app.

3. Supply the image as quay.io/langley_millard_ibm/webauthn-site

4. Configure the app to listen on port 3000

5. Ensure min instances is set to 1, and your configuration has at least 1vCPU and 4GB ram.
6. Set the environment variables, see below:

## Environment variables
`RP_FQDN`

The relying party fully qualified domain name (FQDN) which can be obtained from the container hosting environment. For example:

```
RPS_FQDN=application-8t.12890dj1.au-syd.codeengine.ibm.com
```

`SERVER_PORT`

The port that the web application will listen on. For example:

```
SERVER_PORT=5000 (default)
```

`DANGEROUSLY_DISABLE_HOST_CHECK`

To ensure that the container host can allows cross-origin requests between the replying party server and the web application. For example:

```
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

## Resources
[Supporting Security Key Authentication Using Physical Keys](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_security_key_authentication_using_physical_keys)

[Public-Private Key Authentication](
https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication)

[W3C Web Authentication](https://www.w3.org/TR/webauthn-2/)
