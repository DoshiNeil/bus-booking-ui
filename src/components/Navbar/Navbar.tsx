import React from 'react';
import logo from '!file-loader!../../bus_logo.svg';
import style from './navbar.module.css';
import { TbCaretDownFilled } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname.split('/')[1];
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    navigate(e.target.value);

  return (
    <div className={style.navbar}>
      <img src={logo} alt="Bus booking" className={style.logoIcon} />
      <div className={style.logoTitle}>
        <span>Bus Booking</span>
        <div className={style.dropdownField}>
          <select
            value={currentPage ?? 'dashboard'}
            onChange={handleSelectChange}
          >
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
