import React from 'react';

import './Authorization.scss';

const Authorization = () => {
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
            />
          </div>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button type="button" className="btn btn-primary mr-4">
            Log In
          </button>
          <button type="button" className="btn btn-secondary">
            Sing Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
