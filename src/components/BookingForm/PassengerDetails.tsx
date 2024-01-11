import React from 'react';
import style from './bookingForm.module.css';

export enum PassengerDetailsField {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
}

type PassengerDetailsProps = {
  seatNumber: string;
  updateSeatDetails: (
    value: string,
    field: PassengerDetailsField,
    seatNumber: string,
  ) => void;
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
          value={seatNumber}
        />
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateSeatDetails(
              e.target.value,
              PassengerDetailsField.FIRST_NAME,
              seatNumber,
            )
          }
        />
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateSeatDetails(
              e.target.value,
              PassengerDetailsField.LAST_NAME,
              seatNumber,
            )
          }
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          placeholder="Email"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateSeatDetails(
              e.target.value,
              PassengerDetailsField.EMAIL,
              seatNumber,
            )
          }
        />
      </div>
    </div>
  );
};
