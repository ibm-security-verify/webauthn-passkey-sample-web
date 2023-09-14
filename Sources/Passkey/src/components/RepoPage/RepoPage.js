import React from 'react';
import { Grid, Row, Column, Content, Link, ListBox } from '@carbon/react';

const items = [
  { id: 'webauthn-relying-party-server-swift', link: 'https://github.com/ibm-security-verify/webauthn-relying-party-server-swift' },
  { id: 'webauthn-relying-party-kit-ios', link: 'https://github.com/ibm-security-verify/webauthn-relying-party-server-swift' },
  { id: 'webauthn-relying-party-sample-ios', link: 'https://github.com/ibm-security-verify/webauthn-passkey-sample-ios' },
  { id: 'webauthn-relying-party-sdk-android', link: 'https://github.com/ibm-security-verify/webauthn-relying-party-sdk-android' },
  { id: 'webauthn-passkey-sample-android', link: 'https://github.com/ibm-security-verify/webauthn-passkey-sample-android' },
  { id: 'webauthn-passkey-sample-web', link: 'https://github.com/ibm-security-verify/webauthn-passkey-sample-web' },
];
const RepoPage = () => {
  return (
    <div>
      <Grid>
        <Column lg={12} md={8} sm={2}>
        
      <h2>Resources to explore</h2>
      <p>IBM Provides a number of Open Source Repositories for you to build passwordless into your applications. The codebase for this site can be found under the web sample, but you can also choose to explore this capability in IOS or Android.</p>
      <hr style={{ borderTop: '2px solid #0307fc', margin: '40px 0' }} />
      <ul>
        {items.map((item, index) => (
          <Row>
          <h3 key={index}>{item.id}</h3> 
          <Link>{item.link}</Link>
          <hr style={{ borderTop: '1px solid #ccc', margin: '40px 0' }} />
          </Row>
        ))}
      </ul>
 
        </Column>
      </Grid>
    </div>
  );
};

export default RepoPage;
