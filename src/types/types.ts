export enum Deck {
  LOWER = 'lower deck',
  UPPER = 'upper deck',
}

export enum SeatStatus {
  AVAILABLE,
  UNAVAILABLE,
  SELECTED,
  FEMALE_ONLY,
}

export interface Seat {
  number: string;
  status: SeatStatus;
}

export interface SeatMap {
  deck: Deck;
  seats: Seat[];
}

export interface Bus {
  hasUpperDeck?: boolean;
  seatMap: SeatMap[];
}
