import React from 'react';
import axios from 'axios';
import apiRoutes from '../routes';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
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
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-4">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="../1.jpg" alt="Hexlet Chat" />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <h1 className="text-center mb-4">Регистрация</h1>
                        <div className="form-group">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              name="username"
                              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                            />
                            <label htmlFor="username">Имя:</label>
                            {errors.username && touched.username && (
                              <div className="invalid-feedback">{errors.username}</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="form-floating mb-3">
                            <Field
                              type="password"
                              name="password"
                              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                            />
                            <label htmlFor="password">Пароль:</label>
                            {errors.password && touched.password && (
                              <div className="invalid-feedback">{errors.password}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
                            Отправить
                          </button>
                        </div>
                        {errors.general && (
                          <div className="text-danger text-center mt-3">
                            {errors.general}
                          </div>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="card-footer text-center">
                <p>
                  Есть аккаунт? <a href="/">Войти</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
