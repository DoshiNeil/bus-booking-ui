import React, { useState } from 'react';
import style from './table.module.css';

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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <tr>
      <td className={style.seatNumberStyle}>
        {isEditMode && (
          <input
            className={style.inputStyle}
            type="text"
            id="seatNumber"
            disabled
            value={seatNumber}
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
            value={firstName}
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
            value={lastName}
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
            value={email}
          />
        )}
        {!isEditMode && email}
      </td>
      <td className={style.tdStyle}>
        {isEditMode && (
          <input
            className={style.inputStyle}
            type="date"
            id="bookingDate"
            value={bookingDate.toLocaleDateString()}
          />
        )}
        {!isEditMode && bookingDate.toLocaleDateString()}
      </td>
      <td>
        {!isEditMode && (
          <button onClick={() => setIsEditMode(true)}>Edit</button>
        )}
        {isEditMode && (
          <div className={style.btnGroup}>
            <button onClick={() => setIsEditMode(false)}>Cancel</button>
            <button>Save</button>
          </div>
        )}
      </td>
    </tr>
  );
};
