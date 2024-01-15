export enum Orientation {
  VERTICAL,
  HORIZONTAL,
}
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

export enum RowMode {
  EDIT,
  READ_ONLY,
}

export enum LocalStorageKey {
  BOOKINGS = 'bookings',
}

export type Bookings = {
  travelDate: Date;
  seatNumber: string;
  firstName: string;
  lastName: string;
  email: string;
};

export interface Seat {
  number: string;
  status: SeatStatus;
}

export interface ISeatMap {
  deck: Deck;
  seatSize: {
    width: number;
    height: number;
  };
  map: {
    x: number;
    y: number;
    orientation: Orientation;
    seatNumber: string;
    status: SeatStatus;
  }[];
}
