import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function LoginPage() {
  const { loginHandler } = useContext(UserContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h2>Login</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <form onSubmit={loginHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
              />
              <div id="emailHelp" className="form-text">
                1@1
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
