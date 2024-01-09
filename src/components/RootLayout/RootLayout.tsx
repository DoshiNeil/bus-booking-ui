import React from 'react';
import { Navbar } from '../Navbar/Navbar';

type LayoutProps = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
};
export const RootLayout: React.FC<LayoutProps> = ({
  children,
}: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
