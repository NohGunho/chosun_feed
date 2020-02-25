import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../assets/chosun_logo.png';
import camera from '../assets/camera.svg';

function Header () {
  return (
    <header id="main-header">
      <section className="header-content">
        <Link to="/">
          <img src={ logo } alt="logo"/>
        </Link>
        <Link to="/new">
          <img src={ camera } alt="upload"/>
        </Link>
      </section>
    </header>
  );
}

export default Header;