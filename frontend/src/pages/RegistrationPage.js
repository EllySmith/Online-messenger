import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import apiRoutes from '../routes';
import Header from '../components/Header';
import useValidationSchema from '../utils/validation';
import RegImage from '../images/RegistrationPage.png';

import '../App.css';

const Registration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const validationSchema = useValidationSchema();
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    try {
      setSubmitting(true);
      const response = await axios.post(apiRoutes.signupPath(), {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError(t('errors.userExists'));
      } else {
        setError('Unknown error');
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
                  <img
                    src={RegImage}
                    alt="Hexlet Chat"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <h1 className="text-center mb-4">
                          {t('form.registrationHeader')}
                        </h1>
                        <div className="form-group">
                          <div className="form-floating mb-3">
                            <Field
                              id="username"
                              type="text"
                              name="username"
                              className={`form-control ${errors.username && touched.username
                                  ? 'is-invalid'
                                  : ''
                                }`}
                              placeholder={t('form.name')}
                            />
                            <label htmlFor="username" className="form-label">
                              {t('form.name')}
                            </label>
                            {errors.username && touched.username && (
                              <div className="invalid-feedback">
                                {errors.username}
                              </div>
                            )}
                          </div>
                          <div className="form-floating mb-3">
                            <Field
                              id="password"
                              type="password"
                              name="password"
                              className={`form-control ${errors.password && touched.password
                                  ? 'is-invalid'
                                  : ''
                                }`}
                              placeholder={t('form.password')}
                            />
                            <label htmlFor="password" className="form-label">
                              {t('form.password')}
                            </label>
                            {errors.password && touched.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>
                          <div className="form-floating mb-3">
                            <Field
                              id="confirmPassword"
                              type="password"
                              name="confirmPassword"
                              className={`form-control ${errors.confirmPassword
                                  && touched.confirmPassword
                                  ? 'is-invalid'
                                  : ''
                                }`}
                              placeholder={t('form.passwordCheck')}
                            />
                            <label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              {t('form.passwordCheck')}
                            </label>
                            {errors.confirmPassword
                              && touched.confirmPassword
                              && (
                                <div className="invalid-feedback">
                                  {errors.confirmPassword}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-outline-primary"
                            disabled={isSubmitting}
                            aria-label="general"
                          >
                            {t('form.registration')}
                          </button>
                        </div>
                        {error
                          && (
                            <div className="text-danger text-center mt-3">
                              {error}
                            </div>
                          )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="card-footer text-center">
                <p>
                  {t('form.withAccount')}
                  <a href="/">
                    {t('form.enter')}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
