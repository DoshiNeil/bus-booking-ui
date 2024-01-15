import React, { createContext, useState } from 'react';
import { seatMap as defaultMap } from '../../constants/seedData';
import { Deck, ISeatMap, SeatStatus } from '../../types/types';
import { getLocalStorageItem } from '../../utils/TypedLocalStorage';

type ReservationContextType = {
  seatMap: ISeatMap[];
  updateSeatStatus: (
    deck: Deck,
    seatNumber: string,
    status: SeatStatus,
  ) => void;
};

// fn to generate the seatMap based on bookings
const getSeatMap = (): ISeatMap[] => {
  const bookings = getLocalStorageItem('bookings');

  if (!bookings.bookings) return defaultMap;

  const bookedSeats: string[] = bookings.bookings.map((b) => b.seatNumber);

  // updating the seat statuses as per bookings confirmed
  return defaultMap.map((d) => {
    const updatedSeats = d.map.map((s) => {
      return bookedSeats.includes(s.seatNumber)
        ? // setting all the bookings to unavailable
          { ...s, status: SeatStatus.UNAVAILABLE }
        : s.status == SeatStatus.SELECTED
          ? // removing transient state which the user might have left in between
            { ...s, status: SeatStatus.AVAILABLE }
          : s;
    });
    return { ...d, map: updatedSeats };
  }) as unknown as ISeatMap[];
};

export const ReservationContext = createContext<ReservationContextType>({
  seatMap: [],
  updateSeatStatus: () => {
    return;
  },
});

type ReservationContextProviderType = {
  children: React.ReactNode | JSX.Element | JSX.Element[];
};

export const ReservationContextProvider: React.FC<
  ReservationContextProviderType
> = ({ children }: ReservationContextProviderType) => {
  const [seatMap, setSeatMap] = useState<ISeatMap[]>(getSeatMap());

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
    <ReservationContext.Provider
      value={{
        seatMap,
        updateSeatStatus,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
