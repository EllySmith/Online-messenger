import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const logOut = () => {
    localStorage.token = '';
    localStorage.username = '';
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container d-flex justify-content-between align-items-center">
      <a className="navbar-brand" href="/">{t('header.title')}</a>

        <div className="d-flex align-items-center justify-items-center">
          {localStorage.username && (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={logOut}
              style={{ marginRight: '1rem' }}
            >
              {t('header.quit')}
            </button>
          )}
          <button
            type="button"
            className="btn btn-light eng"
            onClick={() => changeLanguage('eng')}
            aria-label="english"
          />
          <button
            type="button"
            className="btn btn-light mx-2 it"
            onClick={() => changeLanguage('it')}
            aria-label="italian"
          />
          <button
            type="button"
            className="btn btn-light ru"
            onClick={() => changeLanguage('ru')}
            aria-label="russian"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
