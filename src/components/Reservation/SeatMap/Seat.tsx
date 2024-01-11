import React, { useContext } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { Deck, Orientation, SeatStatus } from '../../../types/types';
import { ReservationContext } from '../ReservationProvider';

type SeatProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  orientation?: Orientation;
  status: SeatStatus;
  seatNumber: string;
  deck: Deck;
};

export const Seat: React.FC<SeatProps> = ({
  x,
  y,
  width = 40,
  height = 25,
  orientation = Orientation.HORIZONTAL,
  status,
  seatNumber,
  deck,
}: SeatProps) => {
  const context = useContext(ReservationContext);

  const w = orientation === Orientation.HORIZONTAL ? width : height;
  const h = orientation === Orientation.HORIZONTAL ? height : width;
  const color = () => {
    switch (status) {
      case SeatStatus.AVAILABLE:
        return '#fefefe';
        break;
      case SeatStatus.SELECTED:
        return '#040404';
        break;
      case SeatStatus.UNAVAILABLE:
        return '#c3c3c3';
        break;
      case SeatStatus.FEMALE_ONLY:
        return '#d84e55';
        break;

      default:
        return '#ffffff';
    }
  };

  const onClick = () => {
    if (status === SeatStatus.AVAILABLE) {
      context?.updateSeatStatus(deck, seatNumber, SeatStatus.SELECTED);
    }
    if (status === SeatStatus.SELECTED)
      context?.updateSeatStatus(deck, seatNumber, SeatStatus.AVAILABLE);
  };

  return (
    <Group onClick={onClick}>
      <Rect x={x} y={y} width={w} height={h} stroke="#a4a4a4" fill={color()} />
      <Rect
        x={x + w * 0.7}
        y={y + h * 0.25}
        width={w * 0.2}
        height={h * 0.5}
        stroke="#a4a4a4"
      />
      {status === SeatStatus.SELECTED && (
        <Text
          x={x + width * 0.1}
          y={y + height / 2}
          stroke="white"
          text={seatNumber}
          fontSize={12}
          strokeWidth={1}
        />
      )}
    </Group>
  );
};
