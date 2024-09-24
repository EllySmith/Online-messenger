import React from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 

  const logOut = () => {
    localStorage.token = '';
    localStorage.username = '';
    navigate('/');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng); 
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Chat</a>
        {localStorage.username && (
          <button type="button" className="btn btn-primary" onClick={logOut}>
            {t('header.quit')}
          </button>
        )}
        <div>
          <button onClick={() => changeLanguage('eng')}>English</button>
          <button onClick={() => changeLanguage('it')}>Italian</button>
          <button onClick={() => changeLanguage('ru')}>Russian</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
