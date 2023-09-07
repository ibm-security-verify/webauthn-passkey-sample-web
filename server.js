const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const https = require('https')
const app = express();
const port = process.env.SERVER_PORT || 5000;

const rpsFqdn = process.env.RPS_FQDN || "secure.localhost"
const rpPort = ":8080"
const protocol = "https"
const reqString = protocol + "://" + rpsFqdn
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
axios.defaults.httpsAgent = httpsAgent
// This displays message that the server running and listening to specified port
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
app.use(express.json())



//authenticate a user with a username and password
app.post('/v1/authenticate', (req, res) => {
  // Extract data from the request body
  const { password, username } = req.body;
  // Prepare the data to send to the database API
  const requestData = {
    password,
    username
  };
  
  //console.log(reqString)
  axios.post(reqString +  '/v1/authenticate', requestData)
    .then((response) => {
      const responseData = response.data;
      res.send(responseData);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred' });
    });
});

//get a challenge with either attestation or assertion
app.post('/v1/challenge', (req, res) => {
  const token = req.headers.authorization
  const { displayName, type } = req.body;
  const requestData = {
    displayName,
    type
  };
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  };
  axios.post(reqString +  '/v1/challenge', requestData, { headers })
    .then((response) => {
      
      res.send(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred' });
    });
});



app.post('/v1/signin', (req, res) => {
  // Extract data from the request body
  console.log(req.body)
  // Prepare the data to send to the database API
  const { clientDataJSON, authenticatorData, credentialId, signature, userHandle } = req.body;

  // Prepare the data to send to the database API
  const requestData = {
    clientDataJSON,
    authenticatorData,
    credentialId,
    signature,
    userHandle
  };

  // Make a POST request to the database API
  axios.post(reqString + '/v1/signin', requestData)
    .then((response) => {
      const responseData = response.data;
      res.send(responseData);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred' });
    });
});

app.post('/v1/register', (req, res) => {
  const token = req.headers.authorization
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  };
  // Extract data from the request body
  console.log(req.body)
  // Prepare the data to send to the database API
  const { nickname, 
    clientDataJSON,
    attestationObject,
    credentialId } = req.body;

  // Prepare the data to send to the database API
  const requestData = {
    nickname, 
    clientDataJSON,
    attestationObject,
    credentialId,
  };

  // Make a POST request to the database API
  axios.post(reqString + '/v1/register', requestData , { headers })
    .then((response) => {
      const responseData = response.data;
      res.send(responseData);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred' });
    });
});
