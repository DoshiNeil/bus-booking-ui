import React from 'react';
import style from './reservation.module.css';
import SeatMap from './SeatMap';
import Legends from './Legends';
import { Deck } from '../../types/types';

export const Reservation: React.FC = () => {
  return (
    <div className={style.reservationLayout}>
      <div className={style.seatMap}>
        <div className={style.infoText}>
          <span>
            Click on an available seat to proceed with your transaction
          </span>
        </div>
        <h3>Lower Deck</h3>
        <SeatMap />
        <h3>Upper Deck</h3>
        <SeatMap deck={Deck.UPPER} />
      </div>
      <div className={style.legends}>
        <h3>Seat Legends </h3>
        <Legends />
      </div>
    </div>
  );
};
