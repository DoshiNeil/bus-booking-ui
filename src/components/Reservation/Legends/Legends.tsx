import React from 'react';
import style from './legends.module.css';

export const Legends: React.FC = () => {
  return (
    <div className={style.legends}>
      <div className={style.legend}>
        <div className={`${style.legendColor} ${style.femaleOnly}`} />
        <h4>Female</h4>
      </div>
      <div className={style.legend}>
        <div className={`${style.legendColor} ${style.unavailable}`} />
        <h4>Unavailable</h4>
      </div>
      <div className={style.legend}>
        <div className={`${style.legendColor} ${style.available}`} />
        <h4>Available</h4>
      </div>
      <div className={style.legend}>
        <div className={`${style.legendColor} ${style.selected}`} />
        <h4>Selected</h4>
      </div>
    </div>
  );
};
