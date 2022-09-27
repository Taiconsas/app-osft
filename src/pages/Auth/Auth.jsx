import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './Auth.css';


const Auth = ( { mode, onAuth, onAuthModeChange } ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log("_email: ", email, "_password: ", password);
  
  const inputChangeHandler = (event, input) => {
    if(input === 'email'){
      setEmail(event.target.value);
    }

    if(input === 'password'){
      setPassword(event.target.value);
    }
  };

  let modeButtonText = 'Switch to Signup';
    let submitButtonText = 'Login';
    if (mode === 'signup') {
      modeButtonText = 'Switch to Login';
      submitButtonText = 'Signup';
    }

  return (
    <main>
        <section className="auth__mode-control">
          <Button type="button" onClick={onAuthModeChange}>
            {modeButtonText}
          </Button>
        </section>
        <form
          className="auth__form"
          onSubmit={event => onAuth(event, {
              email: email,
              password: password
            })
          }
        >
          <Input
            label="E-Mail"
            config={{ type: 'email' }}
            onChange={event => inputChangeHandler(event, 'email')}
          />
          <Input
            label="Password"
            config={{ type: 'password' }}
            onChange={event => inputChangeHandler(event, 'password')}
          />
          <Button type="submit">{submitButtonText}</Button>
        </form>
      </main>
  );
};

export default Auth;