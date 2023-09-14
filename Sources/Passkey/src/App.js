import React, { Component } from 'react';
import './app.scss';
import { Content } from '@carbon/react';
import WebHeader from './components/WebHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RepoPage from './components/RepoPage';
import { Theme } from '@carbon/react';
class App extends Component {
  state = {
    data: null,
  };

  // componentDidMount() {
  //   this.callBackendAPI()
  //     .then(res => this.setState({ data: res.express }))
  //     .catch(err => console.log(err));
  // }
  // fetching the GET route from the Express server which matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message);
  //   }
  //   return body;
  // };

  render() {
    return (
      <>
        <Theme theme="g100">
          <WebHeader />
        </Theme>
        <Content>
          <Switch>
            <Route
              exact
              path="/"
              component={LandingPage}
              data={this.state.data}
            />
            <Route path="/repos" component={RepoPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
