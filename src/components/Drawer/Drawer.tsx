import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import style from './drawer.module.css';

type DrawerProps = {
  show: boolean;
  children: React.ReactNode | JSX.Element | JSX.Element[];
};

// writing a simple debounce fn to re-render the sidebar on window resize
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const Drawer: React.FC<DrawerProps> = ({
  show,
  children,
}: DrawerProps) => {
  const [windowDims, setWindowDims] = useState<{ w: number; h: number }>({
    w: window.innerWidth,
    h: innerHeight,
  });

  const handleResize = () =>
    setWindowDims({
      w: window.innerWidth,
      h: innerHeight,
    });

  useEffect(() => {
    window.addEventListener('resize', debounce(handleResize, 250));
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const props = useSpring({
    left: show ? windowDims.w - 500 : windowDims.w,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    position: 'absolute' as any, // temporary fix until the types on the konva lib are fixed
    backgroundColor: '#a6a6a6',
    width: '500px',
    height: '50rem',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  });

  return (
    <animated.div style={props}>
      <div className={style.drawer}>{children}</div>
    </animated.div>
  );
};
