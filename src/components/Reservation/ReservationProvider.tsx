import React, { createContext, useState } from 'react';
import { seatMap as defaultMap } from '../../constants/seedData';
import { Deck, ISeatMap, SeatStatus } from '../../types/types';

type ReservationContextType = {
  seatMap: ISeatMap[];
  updateSeatStatus: (
    deck: Deck,
    seatNumber: string,
    status: SeatStatus,
  ) => void;
};

export const ReservationContext = createContext<ReservationContextType | null>(
  null,
);

type ReservationContextProviderType = {
  children: React.ReactNode | JSX.Element | JSX.Element[];
};

export const ReservationContextProvider: React.FC<
  ReservationContextProviderType
> = ({ children }: ReservationContextProviderType) => {
  const [seatMap, setSeatMap] = useState<ISeatMap[]>(defaultMap);
  const updateSeatStatus = (
    deck: Deck,
    seatNumber: string,
    status: SeatStatus,
  ) => {
    setSeatMap((map: ISeatMap[]): ISeatMap[] => {
      const updatedMap: ISeatMap[] = [...map];
      const seat = updatedMap
        .find((m) => m.deck === deck) // matching the deck to check for seat
        ?.map.find((s) => s.seatNumber === seatNumber); // matching the seat number to update

      if (seat) {
        seat.status = status;
      } else {
        console.error("Trying to update seat that isn't present");
      }
      return updatedMap;
    });
  };
  return (
    <ReservationContext.Provider value={{ seatMap, updateSeatStatus }}>
      {children}
    </ReservationContext.Provider>
  );
};
