import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import IndicesPage from './pages/Indice/IndicesPage';
import EditIndicePage from './pages/Indice/EditIndicePage';
import AreasPage from './pages/AreaCualificacion/AreasPage';
import AuthPage from './pages/Auth/Auth.jsx';
import IAPage from './pages/IA/HuggingFaceChat.jsx';
import { API_BASE } from "./api.js";

class App extends Component {
  state = {
    isAuth: false,
    authMode: 'login',
    error: null
  };

  componentDidMount() {
    // Revisar si hay token en localStorage al montar el componente
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isAuth: true });
    }
  }

  logoutHandler = () => {
    localStorage.removeItem('token'); // Eliminar token al hacer logout
    this.setState({ isAuth: false });
  };

  authHandler = (event, authData) => {
    event.preventDefault();
    if (authData.email.trim() === '' || authData.password.trim() === '') {
      return;
    }

    const request =
      this.state.authMode === 'login'
        ? axios.post(`${API_BASE}/auth/login`, authData)
        : axios.post(`${API_BASE}/auth/signup`, authData);

    request
      .then(authResponse => {
        if (authResponse.status === 201 || authResponse.status === 200) {
          const token = authResponse.data.token;
          localStorage.setItem('token', token); // Guardar token
          this.setState({ isAuth: true });
        }
      })
      .catch(err => {
        this.errorHandler(err.response?.data?.message || 'Error de autenticación');
        this.setState({ isAuth: false });
      });
  };

  authModeChangedHandler = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }));
  };

  errorHandler = message => {
    this.setState({ error: message });
  };

render() {
  let routes = (
    <Switch>
      <Redirect from="/" to="/indices" exact />
      <Route
        path="/indice/:mode"
        render={props => <EditIndicePage {...props} onError={this.errorHandler} />}
      />
      <Route
        path="/indices/:id/:mode"
        render={props => <EditIndicePage {...props} onError={this.errorHandler} />}
      />
      <Route
        path="/indices/:id"
        render={props => <IndicesPage {...props} onError={this.errorHandler} />}
      />
      <Route
        path="/indices"
        render={props => <IndicesPage {...props} onError={this.errorHandler} />}
      />
      <Route
        path="/areas"
        render={props => <AreasPage {...props} onError={this.errorHandler} />}
      />
      <Route
        path="/text"
        render={props => <IAPage {...props}  onError={this.errorHandler} />}
      />
      {/* 🔹 Agregar /auth también cuando está logueado */}
      <Route
        path="/auth"
        render={() => (
          <AuthPage
            mode={this.state.authMode}
            authenticated={this.state.isAuth}
            user={{ nombre: "Usuario Demo" }} // Aquí luego pones el nombre real que venga del backend
            onAuth={this.authHandler}
            onAuthModeChange={this.authModeChangedHandler}
          />
        )}
      />
    </Switch>
  );

  if (!this.state.isAuth) {
    routes = (
      <Switch>
        <Redirect from="/" to="/auth" exact />
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
      <Header authenticated={this.state.isAuth} onLogout={this.logoutHandler} />
      <div className="main-content">
        {routes}
      </div>
    </div>
  );
}

}

export default App;
