import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './Auth.css';

const Auth = ({ mode, onAuth, onAuthModeChange, authenticated, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fecha, setFecha] = useState('');

  // ✅ Obtener fecha actual al montar
  useEffect(() => {
    const hoy = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    setFecha(hoy.toLocaleDateString('es-ES', opciones));
  }, []);

  const inputChangeHandler = (event, input) => {
    if (input === 'email') setEmail(event.target.value);
    if (input === 'password') setPassword(event.target.value);
  };

  let modeButtonText = 'Switch to Signup';
  let submitButtonText = 'Login';
  if (mode === 'signup') {
    modeButtonText = 'Switch to Login';
    submitButtonText = 'Signup';
  }

  // 🔹 Si ya está logueado, mostrar panel en vez del formulario
  if (authenticated) {
    return (
      <main className="auth__welcome">
        <h2>Bienvenido {user?.nombre || user?.email || 'Usuario'}</h2>
        <p>Fecha actual: {fecha}</p>
      </main>
    );
  }

  // 🔹 Si NO está logueado, mostrar el formulario
  return (
<main className="auth">
  <div className="auth__box">
    <form
      className="auth__form"
      onSubmit={(event) =>
        onAuth(event, {
          email: email,
          password: password,
        })
      }
    >
      <Input
        label="E-Mail"
        config={{ type: 'email' }}
        onChange={(event) => inputChangeHandler(event, 'email')}
      />
      <Input
        label="Password"
        config={{ type: 'password' }}
        onChange={(event) => inputChangeHandler(event, 'password')}
      />
      <Button type="submit">{submitButtonText}</Button>
    </form>

    <section className="auth__mode-control">
      <Button type="button" onClick={onAuthModeChange}>
        {modeButtonText}
      </Button>
    </section>
  </div>
</main>

  );
};

export default Auth;
