import React, { useEffect, useState } from 'react';
import style from './table.module.css';
import { Row } from './Row';
import { getLocalStorageItem } from '../../utils/TypedLocalStorage';
import { Link } from 'react-router-dom';
import { Bookings } from '../../types/types';

export const Table: React.FC = () => {
  const [reservations, setReservations] = useState<Bookings[]>(
    getLocalStorageItem('bookings').bookings,
  );

  useEffect(() => {
    const getUpdatedReservations = () =>
      setReservations(getLocalStorageItem('bookings').bookings);
    window.addEventListener('storage', () => getUpdatedReservations());
    return () => {
      window.removeEventListener('storage', () => getUpdatedReservations());
    };
  }, []);

  return (
    <div className={style.table}>
      {!reservations && (
        <button>
          <Link to="/reservation">Reserve a Seat</Link>
        </button>
      )}
      {reservations && reservations.length == 0 && (
        <button>
          <Link to="/reservation">Reserve a Seat</Link>
        </button>
      )}
      {reservations && reservations.length !== 0 && (
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
            {reservations.map((p) => (
              <Row
                key={`${p.firstName}-${p.lastName}-${p.email}`}
                bookingDate={new Date(p.travelDate)}
                seatNumber={p.seatNumber}
                firstName={p.firstName}
                lastName={p.lastName}
                email={p.email}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
