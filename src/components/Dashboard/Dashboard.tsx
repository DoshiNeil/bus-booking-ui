import React from 'react';
import style from './dashboard.module.css';
import Table from '../Table';

export const Dashboard: React.FC = () => {
  return (
    <div className={style.dashboardLayout}>
      <Table />
    </div>
  );
};
