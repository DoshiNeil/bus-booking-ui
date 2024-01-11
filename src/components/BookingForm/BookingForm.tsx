import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PassengerDetails, PassengerDetailsField } from './PassengerDetails';
import style from './bookingForm.module.css';
import { ReservationContext } from '../Reservation/ReservationProvider';
import { SeatStatus } from '../../types/types';
import { useNavigate } from 'react-router-dom';

type BookingDetails = {
  bookingDate: Date;
  passengers: {
    seatNumber: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
};

export const BookingForm: React.FC = () => {
  const context = useContext(ReservationContext);
  const navigate = useNavigate();
  const [details, updateDetails] = useState<BookingDetails>({
    bookingDate: new Date(),
    passengers: [],
  });

  const updateBookingDetails = (
    value: string,
    field: PassengerDetailsField,
    seatNumber: string,
  ) => {
    updateDetails((prevDetails) => {
      const newDetails = {
        bookingDate: prevDetails.bookingDate,
        passengers: [...prevDetails.passengers],
      };

      const p = newDetails.passengers.find((p) => p.seatNumber === seatNumber);
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
      } else {
        switch (field) {
          case PassengerDetailsField.EMAIL:
            newDetails.passengers.push({
              seatNumber,
              email: value,
              lastName: '',
              firstName: '',
            });
            break;
          case PassengerDetailsField.FIRST_NAME:
            newDetails.passengers.push({
              seatNumber,
              email: '',
              lastName: '',
              firstName: value,
            });
            break;
          case PassengerDetailsField.LAST_NAME:
            newDetails.passengers.push({
              seatNumber,
              email: '',
              lastName: value,
              firstName: '',
            });
            break;
          default:
            break;
        }
      }
      return newDetails;
    });
  };

  const onSave = () => {
    if (selectedSeats) {
      const seats = selectedSeats.map((s) => s.seatNumber);
      const passengersDetailsSeats = details.passengers.map(
        (s) => s.seatNumber,
      );
      // final list of seats
      const _s = passengersDetailsSeats.filter((s) => seats.includes(s));
      //final list of passengers
      const passengers = details.passengers.filter((s) =>
        _s.includes(s.seatNumber),
      );
      if (
        confirm(
          `Selected seats ${JSON.stringify(
            _s,
          )}, shall we confirm the booking ?`,
        )
      ) {
        console.table(passengers);
        navigate('/dashboard');
      }
    }
  };

  const selectedSeats = useMemo(() => {
    let seats = [];
    if (context?.seatMap) {
      seats = context.seatMap
        .map((m) => m.map.filter((s) => s.status === SeatStatus.SELECTED)) // filtering the selected seats
        .reduce((prev, curr) => prev.concat(curr)); // flattening the 2d to 1d array
      return seats;
    }
  }, [context?.seatMap]);

  const isFormValid = useMemo(() => {
    const isFormValid = true;
    if (details.passengers.length === 0) {
      return false;
    }
    details.passengers.forEach((p) => {
      if (
        p.firstName.trim().length === 0 ||
        p.lastName.trim().length === 0 ||
        p.email.trim().length === 0
      ) {
        return false;
      }
    });
    return isFormValid;
  }, [details.passengers]);

  useEffect(() => {
    console.log('Is form valid', isFormValid);
  }, [isFormValid]);

  return (
    <div className={style.bookingFormLayout}>
      <h4 className={style.formTitle}>Booking Details</h4>
      <div className={style.rows}>
        {selectedSeats &&
          selectedSeats.map((s) => (
            <PassengerDetails
              seatNumber={s.seatNumber}
              key={s.seatNumber}
              updateSeatDetails={updateBookingDetails}
            />
          ))}
        <div className={style.actionRow}>
          <button
            className={style.btn}
            onClick={onSave}
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
