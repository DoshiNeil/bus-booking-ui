import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Seat } from './Seat';
import { SteeringWheel } from './SteeringWheel';
import { Deck } from '../../../types/types';

type RowProps = { x: number; y: number; width: number; height: number };

const Row: React.FC<RowProps> = ({ x, y, width, height }: RowProps) => {
  return (
    <>
      <Seat x={x} y={y} width={width} height={height} />
      <Seat x={x} y={y + 1.2 * height} width={width} height={height} />
      <Seat x={x} y={y + 3.3 * height} width={width} height={height} />
    </>
  );
};

const BaseLayout: React.FC = () => {
  return (
    <>
      <Rect x={0} y={0} width={589} height={200} fill="#9d9d9d" />
      <Rect x={0} y={0} width={10} height={200} fill="#4A4A4A" />
    </>
  );
};

type LayoutProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};
const Layout: React.FC<LayoutProps> = ({
  x,
  y,
  width,
  height,
}: LayoutProps) => {
  return (
    <>
      {/* Testing row component */}
      <Row x={x} y={y} width={width} height={height} />
      <Row x={x + 1.1 * width} y={y} width={width} height={height} />
      <Row x={x + 2.2 * width} y={y} width={width} height={height} />
      <Row x={x + 3.3 * width} y={y} width={width} height={height} />
      <Row x={x + 4.4 * width} y={y} width={width} height={height} />
      <Row x={x + 5.5 * width} y={y} width={width} height={height} />
    </>
  );
};

type SeatMapProps = { deck?: Deck };
export const SeatMap: React.FC<SeatMapProps> = ({
  deck = Deck.LOWER,
}: SeatMapProps) => {
  return (
    <Stage width={589} height={211}>
      <Layer>
        <BaseLayout />
        {deck === Deck.LOWER && <SteeringWheel />}
        <Layout
          x={80}
          y={deck === Deck.LOWER ? 14 : 34}
          width={65}
          height={34}
        />
        <Seat
          x={530}
          y={deck === Deck.LOWER ? 40 : 80}
          width={30}
          height={65}
        />
      </Layer>
    </Stage>
  );
};
