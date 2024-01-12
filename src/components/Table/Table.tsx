import React from 'react';
import style from './table.module.css';
import { samplePassengerDetails } from '../../constants/seedData';

export const Table: React.FC = () => {
  const bookingDate = samplePassengerDetails.bookingDate;

  return (
    <div>
      <table className={style.table}>
        <thead>
          <th>Seat Number</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Booking Date</th>
        </thead>
        {samplePassengerDetails.passengers.map((p) => (
          <tr key={`${bookingDate}--${p.seatNumber}`}>
            <td>{p.seatNumber}</td>
            <td>{p.firstName}</td>
            <td>{p.lastName}</td>
            <td>{p.email}</td>
            <td>{bookingDate.toISOString()}</td>
            <td>
              <button>Edit</button>
              <button>Cancel</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
