import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <div className='Header'>
      <header className='header'>
        <img className='header__logo' src={logo} alt='логотип сайта Место' />
      </header>
    </div>
  );
}

export { Header };
