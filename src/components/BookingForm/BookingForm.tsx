import React, { useContext, useMemo } from 'react';
import { PassengerDetails } from './PassengerDetails';
import style from './bookingForm.module.css';
import { ReservationContext } from '../Reservation/ReservationProvider';
import { SeatStatus } from '../../types/types';

export const BookingForm: React.FC = () => {
  const updateBookingDetails = (details: PassengerDetails) => {
    return;
  };

  const context = useContext(ReservationContext);

  const selectedSeats = useMemo(() => {
    let seats = [];
    if (context?.seatMap) {
      seats = context.seatMap
        .map((m) => m.map.filter((s) => s.status === SeatStatus.SELECTED)) // filtering the selected seats
        .reduce((prev, curr) => prev.concat(curr)); // flattening the 2d to 1d array
      console.log("Selected seats",seats);
      return seats;
    }
  }, [context?.seatMap]);

  return (
    <div className={style.bookingFormLayout}>
      <h4>Booking Details</h4>
      <div className={style.rows}>
        <div className={style.bookingDate}>
          <label>Booking Date</label>
          <input type="date" name="booking date" id="bookingDate" />
        </div>
        {selectedSeats &&
          selectedSeats.map((s) => (
            <PassengerDetails
              seatNumber={s.seatNumber}
              key={s.seatNumber}
              updateSeatDetails={updateBookingDetails}
            />
          ))}
      </div>
    </div>
  );
};
