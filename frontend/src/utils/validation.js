import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    username: Yup.string()
      .required(t('errors.noName')) 
      .min(3, t('errors.nameTooShort')) 
      .max(20, t('errors.nameTooLong')),
    password: Yup.string()
      .required(t('errors.noPassword'))
      .min(6, t('errors.passwordTooShort')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors.noMatch'))
      .required(t('errors.noSecondPassword')),
  });
};
