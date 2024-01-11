import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Seat } from './Seat';
import { SteeringWheel } from './SteeringWheel';
import { Deck, Orientation, SeatStatus } from '../../../types/types';

const BaseLayout: React.FC = () => {
  return (
    <>
      <Rect x={0} y={0} width={589} height={200} fill="#f3fefe" />
      <Rect x={0} y={0} width={10} height={200} fill="#4A4A4A" />
    </>
  );
};

type SeatMapProps = {
  deck: Deck;
  seatSize: {
    width: number;
    height: number;
  };
  map: {
    x: number;
    y: number;
    orientation: Orientation;
    seatNumber: string;
    status: SeatStatus;
  }[];
};

export const SeatMap: React.FC<SeatMapProps> = ({
  deck,
  map,
  seatSize,
}: SeatMapProps) => {
  return (
    <Stage width={589} height={211}>
      <Layer>
        <BaseLayout />
        {deck === Deck.LOWER && <SteeringWheel />}
        {map.map((seat) => (
          <Seat
            key={seat.seatNumber}
            x={seat.x}
            y={seat.y}
            orientation={seat.orientation}
            width={seatSize.width}
            height={seatSize.height}
            status={seat.status}
            seatNumber={seat.seatNumber}
            deck={deck}
          />
        ))}
      </Layer>
    </Stage>
  );
};
