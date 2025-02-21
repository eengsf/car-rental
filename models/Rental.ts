export interface Rental {
  id: string;
  carId: string;
  userId: string;

  days: number;
  startTime: string;
  endTime: string;
  totalPrice: number;
  withDriver: boolean;

  createdAt: Date;
}
