import React from 'react';
import style from './table.module.css';
import { samplePassengerDetails } from '../../constants/seedData';
import { Row } from './Row';

export const Table: React.FC = () => {
  const bookingDate = samplePassengerDetails.bookingDate;

  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Seat Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {samplePassengerDetails.passengers.map((p, idx) => (
            <Row
              key={idx}
              bookingDate={bookingDate}
              seatNumber={p.seatNumber}
              firstName={p.firstName}
              lastName={p.lastName}
              email={p.email}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
