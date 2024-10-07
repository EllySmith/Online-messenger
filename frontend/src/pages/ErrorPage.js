import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h3>{t('pagenotfound.notfound')}</h3>
      <p>
        {t('pagenotfound.but')} <a href="/">{t('pagenotfound.mainpage')}</a>.
      </p>
    </div>
  );
};

export default ErrorPage;
