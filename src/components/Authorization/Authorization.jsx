import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/auth.context';
import useHttp from '../../hooks/http.hook';
import './Authorization.scss';
import NotificationContainer from '../NotificationContainer/NotificationContainer';

const Authorization = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      setError('');
      setMessage('');
      const VALID = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[+-_@$!%*?&#.,;:[\]{}])[a-zA-Z0-9+-_@$!%*?&#.,;:[\]{}]{8,16}/.test(
        form.password,
      );

      if (VALID) {
        await request(
          'https://pacific-castle-12388.herokuapp.com/users',
          'POST',
          { ...form },
        );
        setMessage('User Created');
      }
    } catch (e) {
      setError('user with this email already existss');
    }
  };

  const handleLogIn = async () => {
    try {
      setError('');
      setMessage('');
      const VALID = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[+-_@$!%*?&#.,;:[\]{}])[a-zA-Z0-9+-_@$!%*?&#.,;:[\]{}]{8,16}/.test(
        form.password,
      );

      if (VALID) {
        const data = await request(
          'https://pacific-castle-12388.herokuapp.com/signin',
          'POST',
          { ...form },
        );

        auth.logIn(data.token, data.userId);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {error.length > 0 ? (
        <NotificationContainer notifications={[error]} delay={15} />
      ) : (
        ''
      )}
      {message.length > 0 ? (
        <NotificationContainer notifications={[message]} delay={15} />
      ) : (
        ''
      )}
      <div className="container auth-container">
        <form
          className="card"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="card-header text-center">
            <h1>Authorization</h1>
            <p>
              <strong>Tip: </strong>
              Password must contain at least 8 characters, as well as a number
              and one special character of + -_ @ $!% *? & #.,;: [] {}
            </p>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="email">
                  E-mail:
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="email@example.com"
                aria-label="email"
                aria-describedby="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="password">
                  Password:
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="your password"
                aria-label="password"
                aria-describedby="password"
                name="password"
                onChange={handleChange}
                pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[+-_@$!%*?&#.,;:[\]{}])[a-zA-Z0-9+-_@$!%*?&#.,;:[\]{}]{8,16}"
                required
              />
            </div>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary mr-4"
              onClick={handleLogIn}
            >
              Log In
            </button>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleRegister}
            >
              Sing Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Authorization;
