import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
     username: Yup.string()
       .required('Имя обязательно')
       .min(3, 'Имя должно содержать минимум 3 символа')
       .max(20, 'Имя не должно превышать 20 символов'),
     password: Yup.string()
       .required('Пароль обязателен')
       .min(6, 'Пароль должен содержать минимум 6 символов'),
     confirmPassword: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
       .required('Подтверждение пароля обязательно'),
   });