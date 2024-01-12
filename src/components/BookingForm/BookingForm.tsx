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
      }
      return newDetails;
    });
  };

  const passengers = details.passengers;

  // TODO
  const onSave = () => {
    // validate emails and check the syntax if incorrect
    const emailPattern = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const areEmailsValid = passengers
      .map((p) => !!p.email.match(emailPattern))
      .reduce((prev, curr) => prev && curr);

    if (!areEmailsValid) {
      alert('Please add valid emails');
      return;
    }

    if (
      confirm(
        `Selected seats ${JSON.stringify(
          selectedSeats,
        )}, shall we confirm the booking ?`,
      )
    ) {
      // save the details to local storage
      // reset the bus seat map
      navigate('/dashboard');
    }
  };

  const selectedSeats = useMemo(() => {
    let seats = [];
    if (context?.seatMap) {
      seats = context.seatMap
        // filtering the selected seats
        .map((m) => m.map.filter((s) => s.status === SeatStatus.SELECTED))
        // flattening the 2d to 1d array
        .reduce((prev, curr) => prev.concat(curr))
        // need just the seat numbers
        .map((s) => s.seatNumber);
      return seats;
    }
  }, [context?.seatMap]);

  // add / remove passenger on seat selection / de-selection
  useEffect(() => {
    updateDetails((prevDetails: BookingDetails) => {
      const newDetails: BookingDetails = {
        bookingDate: prevDetails.bookingDate,
        passengers: [...prevDetails.passengers],
      };

      const passengers = newDetails.passengers;

      //seats to add
      const newSelectedSeats = selectedSeats?.filter(
        (s) => !newDetails.passengers.map((s) => s.seatNumber).includes(s),
      );
      if (newSelectedSeats?.length !== 0) {
        newSelectedSeats?.forEach((s) =>
          passengers.push({
            seatNumber: s,
            lastName: '',
            firstName: '',
            email: '',
          }),
        );
        return newDetails;
      }

      //seats to remove
      const deSelectedSeats = passengers.filter(
        (s) => !selectedSeats?.includes(s.seatNumber),
      );
      if (deSelectedSeats?.length !== 0) {
        deSelectedSeats?.forEach((s) => {
          passengers.splice(
            passengers.findIndex((p) => p.seatNumber === s.seatNumber),
            1,
          );
        });
      }
      return newDetails;
    });
  }, [selectedSeats]);

  const isFormValid = useMemo(() => {
    let isFormValid = true;
    if (passengers.length === 0) {
      return false;
    }
    passengers.forEach((p) => {
      if (
        p.firstName.trim().length === 0 ||
        p.lastName.trim().length === 0 ||
        p.email.trim().length === 0
      ) {
        isFormValid = false;
      }
    });
    return isFormValid;
  }, [passengers]);

  return (
    <div className={style.bookingFormLayout}>
      <h4 className={style.formTitle}>Booking Details</h4>
      <form className={style.rows}>
        {passengers.map((s) => (
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
      </form>
    </div>
  );
};
