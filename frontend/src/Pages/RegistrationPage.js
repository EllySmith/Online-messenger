import React, { useState } from 'react';
import axios from 'axios';
import apiRoutes from '../routes';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiRoutes.signupPath(), { username, password });
      console.log('User registered:', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token)
      localStorage.setItem('username', username);
      setError('');
      navigate('/success');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Username already exists');
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  return (
    <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={handleSubmit}
  >
    {() => (
      <Form className="container align-items-center justify-content-center">
        <div className="card">
          <div className="form-group">
            <label htmlFor="username">Имя:</label>
            <Field
              type="text"
              name="username"
              className="form-control"
              onChange={setUsername}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <Field
              type="password"
              name="password"
              className="form-control"
              onChange={setPassword}
            />
          </div>
          <button className='submit-button btn btn-primary' onClick={handleSubmit}>Регистрация.</button>
          {error && <div className="error-message">{error}</div>}
          <p className="text-center">Есть аккаунт? <a href='/'>Войти.</a></p>
        </div>
      </Form>
    )}
  </Formik>
  );
}

export default Registration;
