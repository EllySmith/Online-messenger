import './LoginPage.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import apiRoutes from '../routes.js'
import { useNavigate } from 'react-router-dom';


const LoginPage = (index) => {

     const [error, setError] = useState('');

     const navigate = useNavigate();
     const handleSubmit = async (values) => {
          try {
          const { data } = await axios.post(apiRoutes.login(), values);
          const token = data.token;
          localStorage.setItem('token', token)
          navigate('/success');
          } catch (error) {
            setError('Неверное имя пользователя или пароль');
            console.log('error received');
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <Field
              type="password"
              name="password"
              className="form-control"
            />
          </div>
          <button className='submit-button btn btn-primary'>Отправить.</button>
          {error && <div className="error-message">{error}</div>}
          <p className="text-center">Нет аккаунта? <a href='/registration'>Регистрация.</a></p>
        </div>
      </Form>
    )}
  </Formik>
);
};

export default LoginPage;