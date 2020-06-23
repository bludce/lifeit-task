import React from 'react';
import { Link } from 'react-router-dom'

import './Header.sass';

const Header = () => (
  <header className="header">
    <div className="memu">
      <Link to="/" className="menu__link">Главная</Link>
    </div>
  </header>
);

export default Header;