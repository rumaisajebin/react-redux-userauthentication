import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/loginSlice'; // Import setUserFromToken action
import { useNavigate } from 'react-router-dom';

import decodeJWT from '../util/tokenDecoder';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = false
  const error = false

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(formData))
      .then((response) => {
        // alert(JSON.stringify(response))
        // const decodedToken = decodeJWT(response); // Decode the access token
        // dispatch(setUserFromToken(decodedToken)); // Dispatch setUserFromToken action
        navigate('/Profile');
      })
      .catch((error) => console.error('Login failed:', error));
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
