import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import IndicesPage from './pages/Indice/IndicesPage';
import IndicePage from './pages/Indice/IndicePage';
import EditIndicePage from './pages/Indice/EditIndicePage';
import AuthPage from './pages/Auth/Auth';

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [error, setError] = useState(null);
  // let routes = null;
  
  const logoutHandler = () => {
    setIsAuth(false);
  };

  const authHandler = (event, authData) => {
    event.preventDefault();
    if (authData.email.trim() === '' || authData.password.trim() === '') {
      return;
    }

    let request;
    if (authMode === 'login') {
      request = axios.post('https://app-osft-taicon.herokuapp.com/login', authData);
    } else {
      request = axios.post('https://app-osft-taicon.herokuapp.com/signup', authData);
    }
    request
      .then(authResponse => {
        if (authResponse.status === 201 || authResponse.status === 200) {
          const token = authResponse.data.token;
          console.log(token);
          setIsAuth(true);
        }
      })
      .catch(err => {
        this.errorHandler(err.response.data.message);
        console.log(err);
        setIsAuth(false);
      });
  };

  const authModeChangedHandler = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const errorHandler = message => {
    setError(message);
  };

  return (
    <div className="App">
      <Modal
        open={!!error}
        title="An Error Occurred"
        onClose={() => errorHandler(null)}
      >
        <p>{error}</p>
      </Modal>
      <Backdrop show={!!error} />
      <Header
        authenticated={isAuth}
        onLogout={logoutHandler}
      />
      {isAuth ? (
      <Switch>
        <Redirect from="/" to="/auth" exact />
        <Redirect from="/indices" to="/auth" />
        <Redirect from="/indice" to="/auth" />
        <Route
          path="/auth"
          render={() => (
            <AuthPage
              mode={authMode}
              onAuth={authHandler}
              onAuthModeChange={authModeChangedHandler}
            />
          )}
        />
      </Switch>
      ) : (
          <Switch>
            <Redirect from="/" to="/indices" exact />
            <Redirect from="/auth" to="/indices" exact />
            <Redirect from="/signup" to="/indices" exact />
            <Route exact path="/indice/:mode" component={errorHandler} />
            <Route exact path="/indices/:id/:mode" component={errorHandler} />
            <Route exact path="/indices/:id" component={errorHandler} />
            <Route exact path="/indices" component={errorHandler} />
          </Switch>
      )}
    </div>
  );
};

export default App;