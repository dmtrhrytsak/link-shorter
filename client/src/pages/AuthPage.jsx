import { useState, useEffect, useContext } from 'react';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/auth.context';

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const showMessage = useMessage();
  const { loading, error, request, clearError } = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    showMessage(error);
    clearError();
  }, [error, showMessage, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    const data = await request('/api/auth/register', 'POST', { ...form });
    showMessage(data.message);
  };

  const loginHandler = async () => {
    const data = await request('/api/auth/login', 'POST', { ...form });
    auth.login(data.token, data.userId);
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorter Your Link</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>
            <div>
              <div className="input-field">
                <input
                  name="email"
                  id="email"
                  type="text"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div>
              <div className="input-field">
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4"
              disabled={loading}
              onClick={loginHandler}
              style={{ marginRight: '10px' }}
            >
              Log In
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
