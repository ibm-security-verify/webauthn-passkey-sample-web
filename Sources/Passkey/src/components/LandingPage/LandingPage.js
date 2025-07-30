import React, { Component, useEffect, useState } from 'react';
import { Grid, Column } from '@carbon/react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import {
  Button,
  TextInput,
  Form,
  Toggle,
  Row,
  CodeSnippet
} from '@carbon/react';
import { encode, decode } from '../../js/base64url-arraybuffer';

function Message(title, body) {
  this.title = title;
  this.body = body;
}

let messageList = [];


const LandingPage = () => {
  useEffect(() => {
    const retrieveCredential = async () => {
      const payload = {
        displayName: window.location.hostname,
        type: 'assertion',
      };

      const publicKeyCredentialRequestOptions = await fetch('/v1/challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (payload != null) {
        messageList.push(new Message('posted challenge', payload));
      }

      // console.log("posted challenge: ")
      // console.log(payload)
      const credential = await publicKeyCredentialRequestOptions.json();
      if (credential != null) {
        messageList.push(
          new Message(
            'publicKeyCredentialRequestOptions credential',
            credential
          )
        );
        // console.log('publicKeyCredentialRequestOptions credential');
        // console.log(credential);
      }
      const modifiedCredential = {
        ...credential,
        challenge: decode(credential.challenge),
      };

      //messageList.push(Message("modified credential: ", modifiedCredential))
      // console.log("modified credential: ")
      // console.log(modifiedCredential)
      try {
        const credential = await navigator.credentials.get({
          publicKey: modifiedCredential,
        });
        if (credential != null) {
          messageList.push(new Message('got credential: ', credential));
        }

        // console.log("got credential")
        // console.log(credential)
        // Process the retrieved credential
        //const credentialJSON = JSON.stringify(credential.response);
        const credentialJSON = {
          authenticatorData: encode(credential.response.authenticatorData),
          clientDataJSON: encode(credential.response.clientDataJSON), //good
          credentialId: credential.id, // good
          signature: encode(credential.response.signature),
          userHandle: encode(credential.response.userHandle), //good
        };

        //console.log('CredentialJSON credential:', credential);
        const response = await fetch('/v1/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentialJSON),
        });
        // if (response.body != null) {
        //   messageList.push(new Message('got response: ', response.body));
        // }
        console.log(response.body);
        const data = await response.json();

        // If ISV returns an access token, set the username and authenticated state
        if (data.access_token) {
          const payloadData = atob(data.id_token.split('.')[1])
          const claims = JSON.parse(payloadData);
          setUsername(claims.preferred_username)
          setIsAuthenticated(true);
        }
        else if ("username" in data.attributes.responseData) {
          setUsername(data.attributes.responseData.username)
          setIsAuthenticated(true)
        }

        } catch (error) {
        // Handle the error
        console.error('Error retrieving credential:', error);
      }
    };

    retrieveCredential();
  }, []);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [credential, setCredential] = useState(null);

  const createCredential = async access_token => {
    console.log('button pressed');
    try {
      const payload = {
        displayName: window.location.hostname,
        type: 'attestation',
      };
      //console.log('sending attestation challenge');
      const publicKeyCredentialCreationOptions = await fetch('/v1/challenge', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const credential = await publicKeyCredentialCreationOptions.json();
      const modifiedCredential = {
        ...credential,
        rp: {
          ...credential.rp,
        },
        user: {
          ...credential.user,
          id: decode(credential.user.id),
        },
        challenge: decode(credential.challenge),
        excludeCredentials: credential.excludeCredentials.map(
          excludeCredential => ({
            ...excludeCredential,
            id: decode(excludeCredential.id),
          })
        ),
      };
      if (credential != null) {
        messageList.push(new Message('posted attestation: ', credential));
      }

      if (credential != null) {
        messageList.push(
          new Message('attempting creation and registration of : ', modifiedCredential)
        );
      }
      // console.log('posted attestation credential');
      // //console.log(decode(credential.challenge));

      // console.log(credential);
      // console.log('attempting create with modified credential');
      // console.log(modifiedCredential);
      const newCredential = await navigator.credentials
        .create({ publicKey: modifiedCredential })
        .then(async credentialCreate => {
          // if (modifiedCredential != null) {
          //   messageList.push(
          //     new Message('performing navigator create : ', modifiedCredential)
          //   );
          // }
          // console.log('performing navigator create with ');
          // console.log(credentialCreate);
          const registrationParams = {
            credentialId: credentialCreate.id,
            nickname: username,
            clientDataJSON: encode(credentialCreate.response.clientDataJSON),
            attestationObject: encode(credentialCreate.response.attestationObject),
          };

          // if (registrationParams != null) {
          //   messageList.push(
          //     new Message('attempting registration with : ', registrationParams)
          //   );
          // }
          // console.log('attempting registration with ');
          // console.log(registrationParams);
          const registrationOptions = await fetch('/v1/register', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + access_token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationParams),
          });
        });

      setCredential(credential);
      //console.log(credential)
      return credential;
    } catch (error) {
      console.error('Credential creation failed:', error);
    }
  };
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    // todo: remove after testing
    //setIsAuthenticated(true)

    event.preventDefault();

    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('/v1/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.access_token) {
        setIsAuthenticated(true);
        console.log('User logged in successfully!');

        await createCredential(data.access_token);
      } else {
        console.log('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    messageList = [];
    console.log('logged out');
  };

  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  // Toggle handler
  const toggleDeveloperMode = () => {
    setIsDeveloperMode(!isDeveloperMode);
  };

  if (isAuthenticated) {
    return (
      <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem>
              <a href="/">Passkeys web demo </a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h2 className="landing-page__heading">{username} is authenticated</h2>
        </Column>

        <Column lg={16} md={8} sm={4} xs={1} className="landing-page__r3">
          <Grid>
            <Column md={6} lg={5} sm={5}>
              <Button onClick={handleLogout}>Sign Out</Button>
            </Column>
            <Column xl={6} lg={2} md={3} sm={2} />
            <Column lg={6} md={4} sm={2}>
              {isDeveloperMode ? (
               
                <div className="message-list">
                  {messageList.map((message, index) => (
                    <div key={index} className="message">
                      <p>{message.title}</p>
                      <div className="code-snippet-wrapper">
                        <CodeSnippet hideCopyButton={true} className="custom-code-snippet">
                          {JSON.stringify(message.body)} {/* Indent for better readability */}
                        </CodeSnippet>
                      </div>
                    </div>
                  ))}
                </div>
            
              ) : null}
            </Column>
            <Column>
              <div className="devmode-toggle">
                <Toggle
                  id="example-toggle"
                  labelText="Developer Mode"
                  toggled={isDeveloperMode}
                  onToggle={toggleDeveloperMode}
                />
              </div>
            </Column>
          </Grid>
        </Column>
      </Grid>
    );
  } else {
    return (
      <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem>
              <a href="/">Passkeys web demo </a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h2 className="landing-page__heading">Sign in below</h2>
        </Column>

        <Column lg={16} md={8} sm={4} className="landing-page__r3">
          <Grid>
            <Column md={5} lg={5} sm={4} xs={3}>
              <Form onSubmit={handleSubmit}>
                <div>
                  <TextInput
                    helperText=" "
                    id="username"
                    invalidText="A valid value is required"
                    labelText="Username"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div>
                  <TextInput
                    helperText=" "
                    id="password"
                    invalidText="A valid value is required"
                    labelText="password"
                    placeholder="**********"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                  />
                </div>
                <Button type="submit">Sign in</Button>
              </Form>
            </Column>

            <Column xl={6} lg={2} md={3} sm={2} />
            <Column lg={6} md={4} sm={2}>
              {isDeveloperMode ? (
               
                <div className="message-list">
                  {messageList.map((message, index) => (
                    <div key={index} className="message">
                      <p>{message.title}</p>
                      <div className="code-snippet-wrapper">
                        <CodeSnippet hideCopyButton={true} className="custom-code-snippet">
                          {JSON.stringify(message.body)} {/* Indent for better readability */}
                        </CodeSnippet>
                      </div>
                    </div>
                  ))}
                </div>
           
              ) : null}
            </Column>
            <Column>
              <div className="devmode-toggle">
                <Toggle
                  id="devmode-toggle"
                  labelText="Developer Mode"
                  toggled={isDeveloperMode}
                  onToggle={toggleDeveloperMode}
                />
              </div>
            </Column>
          </Grid>
        </Column>
      </Grid>
    );
  }
};

export default LandingPage;
