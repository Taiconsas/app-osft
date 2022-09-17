import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import IndicesPage from './pages/Indice/IndicesPage';
import IndicePage from './pages/Indice/IndicePage';
import EditIndicePage from './pages/Indice/EditIndicePage';
import AuthPage from './pages/Auth/Auth';

class App extends Component {
  state = {
    isAuth: true,
    authMode: 'login',
    error: null
  };

  logoutHandler = () => {
    this.setState({ isAuth: false });
  };

  authHandler = (event, authData) => {
    event.preventDefault();
    if (authData.email.trim() === '' || authData.password.trim() === '') {
      return;
    }
    let request;
    if (this.state.authMode === 'login') {
      request = axios.post('https://app-osft-taicon.herokuapp.com/login', authData);
    } else {
      request = axios.post('https://app-osft-taicon.herokuapp.com/signup', authData);
    }
    request
      .then(authResponse => {
        if (authResponse.status === 201 || authResponse.status === 200) {
          const token = authResponse.data.token;
          console.log(token);
          // Theoretically, you would now store the token in localstorage + app state
          // and use it for subsequent requests to protected backend resources
          this.setState({ isAuth: true });
        }
      })
      .catch(err => {
        this.errorHandler(err.response.data.message);
        console.log(err);
        this.setState({ isAuth: false });
      });
  };

  authModeChangedHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };

  errorHandler = message => {
    this.setState({
      error: message
    });
  };

  render() {
    let routes = (
      <Switch>
        <Redirect from="/" to="/indices" exact />
        <Redirect from="/auth" to="/indices" exact />
        <Redirect from="/signup" to="/indices" exact />
        <Route
          path="/indice/:mode"
          render={props => (
            <EditIndicePage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/indices/:id/:mode"
          render={props => (
            <EditIndicePage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/indices/:id"
          render={props => (
            <IndicePage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/indices"
          render={props => (
            <IndicesPage {...props} onError={this.errorHandler} />
          )}
        />
      </Switch>
    );

    if (!this.state.isAuth) {
      routes = (
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Redirect from="/indices" to="/auth" />
          <Redirect from="/indice" to="/auth" />
          <Route
            path="/auth"
            render={() => (
              <AuthPage
                mode={this.state.authMode}
                onAuth={this.authHandler}
                onAuthModeChange={this.authModeChangedHandler}
              />
            )}
          />
        </Switch>
      );
    }

    console.log("isAuth", this.state.isAuth);
    console.log("authMode", this.state.authMode);
    console.log("error", this.state.error);
    console.log("routes", routes);

    return (
      <div className="App">
        <Modal
          open={!!this.state.error}
          title="An Error Occurred"
          onClose={() => this.errorHandler(null)}
        >
          <p>{this.state.error}</p>
        </Modal>
        <Backdrop show={!!this.state.error} />
        <Header
          authenticated={this.state.isAuth}
          onLogout={this.logoutHandler}
        />
        {routes}
      </div>
    );
  }
}

export default App;
