import React from 'react';
import { Link } from 'react-router-dom'

import './Header.sass';

const Header = ({auth, setAuth}) => (
  <header className="header">
    <div className="menu">
      <Link to="/" className="menu__link">Главная</Link>
      {auth ?
      <div className="logout" onClick={()=> setAuth()}>Выйти</div> : ''
      }
    </div>
  </header>
);

export default Header;