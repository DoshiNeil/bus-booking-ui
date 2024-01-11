import React, { useState } from 'react';
import style from './bookingForm.module.css';

export type PassengerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBooking: string;
};

type PassengerDetailsProps = {
  seatNumber: string;
  updateSeatDetails: (details: PassengerDetails) => void;
};
export const PassengerDetails: React.FC<PassengerDetailsProps> = ({
  seatNumber,
  updateSeatDetails,
}: PassengerDetailsProps) => {
  return (
    <div className={style.passengerDetails}>
      <div>
        <input
          type="text"
          id="seatNumber"
          disabled
          className={style.seatNumberStyle}
        />
        <input type="text" id="firstName" placeholder="First Name" required />
        <input type="text" id="lastname" placeholder="Last Name" required />
      </div>
      <div>
        <input type="email" id="email" placeholder="Email" required />
      </div>
    </div>
  );
};
