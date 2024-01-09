import React from 'react';
import logo from '!file-loader!../../bus_logo.svg';
import style from './navbar.module.css';
import { TbCaretDownFilled } from 'react-icons/tb';

export const Navbar: React.FC = () => {
  return (
    <div className={style.navbar}>
      <img src={logo} alt="Bus booking" className={style.logoIcon} />
      <div className={style.logoTitle}>
        <span>Bus Booking</span>
        <div className={style.dropdownField}>
          <select>
            <option value="dashboard">Dashboard</option>
            <option value="reservation">Reservation</option>
          </select>
          <span>
            <TbCaretDownFilled />
          </span>
        </div>
      </div>
    </div>
  );
};
