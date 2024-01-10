import React from 'react';
import { Rect } from 'react-konva';

type SeatProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export const Seat: React.FC<SeatProps> = ({
  x,
  y,
  width = 40,
  height = 25,
}: SeatProps) => {
  return (
    <>
      <Rect x={x} y={y} width={width} height={height} stroke="#4A4A4A" />
      <Rect
        x={x + width * 0.7}
        y={y + height * 0.25}
        width={width * 0.2}
        height={height * 0.5}
        stroke="#4A4A4A"
      />
    </>
  );
};
