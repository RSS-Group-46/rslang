/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/auth.context';
import useHttp from '../../hooks/http.hook';
import './Authorization.scss';

const Authorization = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const data = await request(
        'https://afternoon-falls-25894.herokuapp.com/users',
        'POST',
        { ...form },
      );

      console.log(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogIn = async () => {
    try {
      const data = await request(
        'https://afternoon-falls-25894.herokuapp.com/signin',
        'POST',
        { ...form },
      );

      auth.logIn(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container auth-container">
      <div className="card">
        <div className="card-header text-center">Authorization</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="email">
                E-mail:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="email@example.com"
              aria-label="email"
              aria-describedby="email"
              name="email"
              onChange={handleChange}
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
            />
          </div>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary mr-4"
            onClick={handleLogIn}
          >
            Log In
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRegister}
          >
            Sing Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
