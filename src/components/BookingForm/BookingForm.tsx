import React from 'react';
import { PassengerDetails } from './PassengerDetails';
import style from './bookingForm.module.css';

export const BookingForm: React.FC = () => {
  const updateBookingDetails = (details: PassengerDetails) => {
    return;
  };

  return (
    <div className={style.bookingFormLayout}>
      <h4>Booking Details</h4>
      <div className={style.rows}>
        <div className={style.bookingDate}>
          <label>Booking Date</label>
          <input type="date" name="booking date" id="bookingDate" />
        </div>
        <PassengerDetails
          seatNumber="01 L"
          updateSeatDetails={updateBookingDetails}
        />
      </div>
    </div>
  );
};
