import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from './header.module.scss';

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <button onClick={() => navigate('/signup')}>{t('header.buttons.signup')}</button>
      <button onClick={() => navigate('/signin')}>{t('header.buttons.signin')}</button>
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          i18n.changeLanguage('ru');
        }}
      >
        ru
      </a>
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          i18n.changeLanguage('en');
        }}
      >
        en
      </a>
    </header>
  );
}

export default Header;
