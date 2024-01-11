import React from 'react';
import { animated, useSpring } from 'react-spring';
import style from './drawer.module.css';

type DrawerProps = {
  show: boolean;
};

export const Drawer: React.FC<DrawerProps> = ({ show }: DrawerProps) => {
  const props = useSpring({
    left: show ? window.innerWidth - 300 : window.innerWidth,
    position: 'absolute' as any, // temp fix as the lib is working around getting their types up to speed
    top: 0,
    backgroundColor: '#806290',
    height: '100vh',
    width: '300px',
  });

  return (
    <animated.div style={props}>
      <div className={style.drawer}> Animated drawer! </div>
    </animated.div>
  );
};
