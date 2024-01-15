import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PassengerDetails, PassengerDetailsField } from './PassengerDetails';
import style from './bookingForm.module.css';
import { ReservationContext } from '../Reservation/ReservationProvider';
import { SeatStatus } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import {
  Bookings,
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../utils/TypedLocalStorage';

export const BookingForm: React.FC = () => {
  const { seatMap } = useContext(ReservationContext);
  const navigate = useNavigate();
  const [details, updateDetails] = useState<Bookings[]>([]);

  const updateBookingDetails = (
    value: string,
    field: PassengerDetailsField,
    seatNumber: string,
  ) => {
    updateDetails((prevDetails: Bookings[]) => {
      const newDetails = [...prevDetails];

      const p = newDetails.find((p) => p.seatNumber === seatNumber);
      if (p) {
        switch (field) {
          case PassengerDetailsField.EMAIL:
            p.email = value;
            break;
          case PassengerDetailsField.FIRST_NAME:
            p.firstName = value;
            break;
          case PassengerDetailsField.LAST_NAME:
            p.lastName = value;
            break;
          default:
            break;
        }
      }
      return newDetails;
    });
  };

  const onSave = () => {
    // validate emails and check the syntax if incorrect
    const emailPattern = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const areEmailsValid = details
      .map((p) => !!p.email.match(emailPattern))
      .reduce((prev, curr) => prev && curr);

    if (!areEmailsValid) {
      alert('Please add valid email(s)');
    } else if (
      confirm(
        `Selected seats ${selectedSeats.reduce(
          (prev, curr) => `${prev}, ${curr}`,
        )}. shall we confirm the booking ?`,
      )
    ) {
      const { bookings } = getLocalStorageItem('bookings');
      setLocalStorageItem(
        'bookings',
        bookings
          ? { bookings: [...bookings, ...details] }
          : { bookings: details },
      );
      navigate('/dashboard');
    }
  };

  const selectedSeats = useMemo(() => {
    let seats = [];
    seats = seatMap
      // filtering the selected seats
      .map((m) => m.map.filter((s) => s.status === SeatStatus.SELECTED))
      // flattening the 2d to 1d array
      .reduce((prev, curr) => prev.concat(curr))
      // need just the seat numbers
      .map((s) => s.seatNumber);
    return seats;
  }, [seatMap]);

  // add / remove passenger on seat selection / de-selection
  useEffect(() => {
    updateDetails((prevDetails: Bookings[]) => {
      const newDetails: Bookings[] = [...prevDetails];

      //seats to add
      const newSelectedSeats = selectedSeats?.filter(
        (s) => !newDetails.map((s) => s.seatNumber).includes(s),
      );
      if (newSelectedSeats?.length !== 0) {
        newSelectedSeats?.forEach((s) =>
          newDetails.push({
            seatNumber: s,
            lastName: '',
            firstName: '',
            email: '',
            travelDate: new Date(),
          }),
        );
        return newDetails;
      }

      //seats to remove
      const deSelectedSeats = newDetails.filter(
        (s) => !selectedSeats?.includes(s.seatNumber),
      );
      if (deSelectedSeats?.length !== 0) {
        deSelectedSeats?.forEach((s) => {
          newDetails.splice(
            newDetails.findIndex((p) => p.seatNumber === s.seatNumber),
            1,
          );
        });
      }
      return newDetails;
    });
  }, [selectedSeats]);

  const isFormValid = useMemo(() => {
    let isFormValid = true;
    if (details.length === 0) {
      return false;
    }
    details.forEach((p) => {
      if (
        p.firstName.trim().length === 0 ||
        p.lastName.trim().length === 0 ||
        p.email.trim().length === 0
      ) {
        isFormValid = false;
      }
    });
    return isFormValid;
  }, [details]);

  return (
    <div className={style.bookingFormLayout}>
      <h4 className={style.formTitle}>Booking Details</h4>
      <form className={style.rows}>
        {details.map((s) => (
          <PassengerDetails
            seatNumber={s.seatNumber}
            key={s.seatNumber}
            updateSeatDetails={updateBookingDetails}
          />
        ))}
        <div className={style.actionRow}>
          <button onClick={onSave} disabled={!isFormValid}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
