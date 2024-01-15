import React, { useContext, useEffect, useMemo } from 'react';
import style from './reservation.module.css';
import SeatMap from './SeatMap';
import Legends from './Legends';
import { ReservationContext } from './ReservationProvider';
import Drawer from '../Drawer';
import { SeatStatus } from '../../types/types';
import BookingForm from '../BookingForm';

export const Reservation: React.FC = () => {
  const { seatMap, resetSelection } = useContext(ReservationContext);

  const showDrawer: boolean = useMemo(() => {
    let areSeatsSelected = false;
    console.info(seatMap);
    const selected = seatMap.map((d) =>
      d.map.filter((s) => s.status === SeatStatus.SELECTED),
    );
    areSeatsSelected = selected.some((m) => m.length);
    return areSeatsSelected;
  }, [seatMap]);

  useEffect(() => resetSelection(), []);

  return (
    <div className={style.reservationLayout}>
      <div className={style.seatMap}>
        <div className={style.infoText}>
          <span>
            Click on an available seat to proceed with your transaction
          </span>
        </div>
        {seatMap.map((floorPlan) => (
          <div key={floorPlan.deck}>
            <h3 className={style.mapTitle}>{floorPlan.deck}</h3>
            <SeatMap
              map={floorPlan.map}
              seatSize={floorPlan.seatSize}
              deck={floorPlan.deck}
            />
          </div>
        ))}
      </div>
      <div className={style.legends}>
        <h3>Seat Legends </h3>
        <Legends />
      </div>
      <Drawer show={showDrawer}>
        <BookingForm />
      </Drawer>
    </div>
  );
};
