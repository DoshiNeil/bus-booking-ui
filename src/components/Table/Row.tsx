import React, { useMemo, useState } from 'react';
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

import { PassengerDetailsField } from '../BookingForm/PassengerDetails';
import {
  Bookings,
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../utils/TypedLocalStorage';

import style from './table.module.css';
import { emailPattern } from '../../constants/constants';

type RowProps = {
  bookingDate: Date;
  seatNumber: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const Row: React.FC<RowProps> = ({
  bookingDate,
  seatNumber,
  firstName,
  lastName,
  email,
}: RowProps) => {
  const busBookings = getLocalStorageItem('bookings');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [booking, updateBooking] = useState<Bookings>({
    travelDate: bookingDate,
    firstName,
    lastName,
    email,
    seatNumber,
  });

  const updateBookingDetails = (
    value: string,
    field: PassengerDetailsField,
  ) => {
    updateBooking((booking: Bookings) => {
      switch (field) {
        case PassengerDetailsField.EMAIL:
          return { ...booking, email: value };
        case PassengerDetailsField.FIRST_NAME:
          return { ...booking, firstName: value };
        case PassengerDetailsField.LAST_NAME:
          return { ...booking, lastName: value };
        default:
          break;
      }
      return booking;
    });
  };

  const isFormValid = useMemo(() => {
    let isFormValid = true;
    if (
      booking.firstName.trim().length === 0 ||
      booking.lastName.trim().length === 0 ||
      booking.email.trim().length === 0
    ) {
      isFormValid = false;
    }
    return isFormValid;
  }, [booking]);

  const onSave = () => {
    // validate emails and check the syntax if incorrect
    const isEmailValid = booking.email.match(emailPattern);

    if (!isEmailValid) {
      alert('Please add valid email');
    } else if (
      confirm(`Shall we save changes made to seat number ${booking.seatNumber}`)
    ) {
      setLocalStorageItem('bookings', {
        bookings: [
          ...busBookings.bookings.filter(
            (b) => b.seatNumber !== booking.seatNumber,
          ),
          booking,
        ],
      });
      setIsEditMode(false);
      updateBooking({
        travelDate: bookingDate,
        firstName,
        lastName,
        email,
        seatNumber,
      });
    }
  };

  const onDelete = () => {
    if (
      confirm(
        `Are you sure, you want to delete booking for seat number ${seatNumber} ?`,
      )
    ) {
      setLocalStorageItem('bookings', {
        bookings: busBookings.bookings.filter(
          (s) => s.seatNumber !== seatNumber,
        ),
      });
    }
  };

  return (
    <tr>
      <td className={style.seatNumberStyle}>
        {isEditMode && (
          <input
            className={style.inputStyle}
            type="text"
            id="seatNumber"
            disabled
            value={booking.seatNumber}
          />
        )}
        {!isEditMode && seatNumber}
      </td>
      <td className={style.tdStyle}>
        {isEditMode && (
          <input
            className={style.inputStyle}
            type="text"
            id="firstName"
            placeholder="First Name"
            required
            value={booking.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateBookingDetails(
                e.target.value,
                PassengerDetailsField.FIRST_NAME,
              )
            }
          />
        )}
        {!isEditMode && firstName}
      </td>
      <td className={style.tdStyle}>
        {isEditMode && (
          <input
            className={style.inputStyle}
            type="text"
            id="lastName"
            placeholder="Last Name"
            required
            value={booking.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateBookingDetails(
                e.target.value,
                PassengerDetailsField.LAST_NAME,
              )
            }
          />
        )}
        {!isEditMode && lastName}
      </td>
      <td className={style.tdStyle}>
        {isEditMode && (
          <input
            className={style.inputStyle}
            type="email"
            id="email"
            placeholder="Email"
            required
            value={booking.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateBookingDetails(e.target.value, PassengerDetailsField.EMAIL)
            }
          />
        )}
        {!isEditMode && email}
      </td>
      <td className={style.tdStyle}>
        {isEditMode && (
          <input
            className={style.inputStyle}
            type="text"
            id="bookingDate"
            value={booking.travelDate.toLocaleDateString()}
            disabled
          />
        )}
        {!isEditMode && booking.travelDate.toLocaleDateString()}
      </td>
      <td>
        {!isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            title="Edit booking details"
          >
            <AiOutlineEdit />
          </button>
        )}
        {isEditMode && (
          <div className={style.btnGroup}>
            <button
              title="Cancel Edit"
              onClick={() => {
                setIsEditMode(false);
                updateBooking({
                  travelDate: bookingDate,
                  firstName,
                  lastName,
                  email,
                  seatNumber,
                });
              }}
              className={style.btnCancel}
            >
              <AiOutlineClose />
            </button>
            <button title="Save edit" disabled={!isFormValid} onClick={onSave}>
              <AiOutlineCheck />
            </button>
            <button
              title="Delete reservation"
              className={style.btnDelete}
              onClick={onDelete}
            >
              <AiOutlineDelete />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
