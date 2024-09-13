import React from 'react';
import axios from 'axios';
import apiRoutes from '../routes';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Registration() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { username, password } = values;
    try {
      setSubmitting(true);
      const response = await axios.post(apiRoutes.signupPath(), { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setErrors({});
      navigate('/success');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors({ general: 'Username already exists' });
      } else {
        setErrors({ general: 'An error occurred during registration' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="container align-items-center justify-content-center">
          <div className="card">
          <a class="h3 text-center" href="/">Регистрация</a>
            <div className="form-group">
              <label htmlFor="username">Имя:</label>
              <Field
                type="text"
                name="username"
                className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
              />
              {errors.username && touched.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <Field
                type="password"
                name="password"
                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
              />
              {errors.password && touched.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className='submit-button btn btn-primary'
              disabled={isSubmitting}
            >
              Регистрация
            </button>
            {errors.general && <div className="error-message">{errors.general}</div>}
            <p className="text-center">
              Есть аккаунт? <a href='/'>Войти.</a>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Registration;
