import React from 'react';
import { Circle, Line } from 'react-konva';

export const SteeringWheel: React.FC = () => {
  return (
    <>
      <Circle x={40} y={40} radius={17} stroke="#4A4A4A" strokeWidth={4} />
      <Circle x={40} y={40} radius={5} stroke="#4A4A4A" strokeWidth={2} />
      <Line
        points={[40, 23, 40, 35]}
        tension={1}
        strokeWidth={2}
        stroke="#4A4A4A"
      />
      <Line
        points={[40, 45, 40, 57]}
        tension={1}
        strokeWidth={2}
        stroke="#4A4A4A"
      />
      <Line
        x={30}
        y={5}
        points={[40, 5, 40, 185]}
        tension={1}
        stroke="#4A4A4A"
      />
    </>
  );
};
