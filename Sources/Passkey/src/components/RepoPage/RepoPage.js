import React from 'react';
import { Grid, Row, Column, Content, Link } from '@carbon/react';

const RepoPage = () => {
  return (
    <div>
      <Grid>
        <Column lg={16} md={10} sm={6}>
          <div className="app-container">
            <div className="bx--row">
              <hr
                className="bx--col"
                style={{ borderTop: '1px solid #C4C4C4' }}
              />
            </div>
            <div>
              <p>Relying Party Server</p>
            </div>
            <div>
              <p>
                <Link
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  Click here to open Github.com in a new tab
                </Link>
                <Link
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  Click here to open Github.com in a new tab
                </Link>
              </p>
            </div>

            <div className="bx--row">
              <hr
                className="bx--col"
                style={{ borderTop: '1px solid #C4C4C4' }}
              />
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default RepoPage;
