import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

import style from './header.module.scss';
import Link from '@mui/material/Link';
import { UserControl } from './UserControl/UserControl';

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const BoardsLink = (): JSX.Element => {
    return (
      <Link
        component="button"
        onClick={(e) => {
          e.preventDefault();
          navigate('/boards');
        }}
      >
        {t('boards.boards')}
      </Link>
    );
  };

  return (
    <header className={style.header}>
      {localStorage.getItem('token') && <BoardsLink />}

      {!isLoggedIn && (
        <Button variant="contained" size="small" onClick={() => navigate('/signup')}>
          {t('header.buttons.signup')}
        </Button>
      )}

      {!isLoggedIn && (
        <Button variant="contained" size="small" onClick={() => navigate('/signin')}>
          {t('header.buttons.signin')}
        </Button>
      )}
      {isLoggedIn && <UserControl />}
      <Link
        component="button"
        onClick={(e) => {
          e.preventDefault();
          i18n.changeLanguage('ru');
        }}
      >
        ru
      </Link>
      <Link
        component="button"
        href=""
        onClick={(e) => {
          e.preventDefault();
          i18n.changeLanguage('en');
        }}
      >
        en
      </Link>
    </header>
  );
}

export default Header;
