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
          <th>Seat Number</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Booking Date</th>
        </thead>
        {samplePassengerDetails.passengers.map((p) => (
          <Row
            key={`${bookingDate}-${p.seatNumber}`}
            bookingDate={bookingDate}
            seatNumber={p.seatNumber}
            firstName={p.firstName}
            lastName={p.lastName}
            email={p.email}
          />
        ))}
      </table>
    </div>
  );
};
