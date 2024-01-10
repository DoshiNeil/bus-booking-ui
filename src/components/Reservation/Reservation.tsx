import React, { useState } from 'react';
import style from './reservation.module.css';
import SeatMap from './SeatMap';
import Legends from './Legends';
import { seatMap as map } from '../../constants/seedData';

export const Reservation: React.FC = () => {
  const [seatMap, setSeatMap] = useState(map);

  return (
    <div className={style.reservationLayout}>
      <div className={style.seatMap}>
        <div className={style.infoText}>
          <span>
            Click on an available seat to proceed with your transaction
          </span>
        </div>
        {seatMap.map((floorPlan) => (
          <>
            <h3 className={style.mapTitle}>{floorPlan.deck}</h3>
            <SeatMap
              map={floorPlan.map}
              seatSize={floorPlan.seatSize}
              deck={floorPlan.deck}
            />
          </>
        ))}
      </div>
      <div className={style.legends}>
        <h3>Seat Legends </h3>
        <Legends />
      </div>
    </div>
  );
};
