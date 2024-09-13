import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import apiRoutes from '../routes.js'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';


const LoginPage = (index) => {

     const [error, setError] = useState('');

     const navigate = useNavigate();
     const handleSubmit = async (values) => {
          try {
          const { data } = await axios.post(apiRoutes.login(), values);
          const token = data.token;
          localStorage.setItem('token', token)
          localStorage.setItem('username', values.username);
          navigate('/success');
          } catch (error) {
            setError('Неверное имя пользователя или пароль');
            console.log('error received');
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
     <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={handleSubmit}
  >
    {() => (
      <Form className="col-12 col-md-6 mt-3 mt-md-0 ">

        <h1 className="text-center mb-4 p-0 me-5">Войти</h1>
        <div className="form-floating mb-3 me-3">
        <Field
        type="text"
        name="username"
        className="form-control"
        id="username"
        placeholder="Имя"
        />
        <label htmlFor="username">Имя:</label>
        </div>
          <div className="form-floating mb-3 me-3">
            <Field
              type="text"
              name="password"
              className="form-control"
              id="password"
              placeholder="Пароль"
            />
            <label htmlFor="password">Пароль:</label>
          </div>
          <div className="text-center">
          <button type="submit" className="mb-3 btn btn-outline-primary">Отправить.</button>
          </div>
          
      </Form>
      
    )}
  </Formik>
  </div>
  <div className="card-footer text-center pt-3">
            <p>
              {error && <div className="error-message">{error}</div>}
              Нет аккаунта? <a href='/registration'>Регистрация.</a>
            </p>
          </div>
  </div>
  </div>
  </div>
  </div>
  </div>
);
};

export default LoginPage;