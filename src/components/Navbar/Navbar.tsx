import React from 'react';
import logo from '!file-loader!../../bus_logo.svg';
import style from './navbar.module.css';

export const Navbar: React.FC = () => {
  const currentPage = 'Dashboard';

  return (
    <div className={style.navbar}>
      <img src={logo} alt="Bus booking" className={style.logoIcon} />
      <div className={style.logoTitle}>
        <span>Bus Booking</span>
        <span>{currentPage}</span>
      </div>
    </div>
  );
};
