export interface ProductCar {
  id: string;
  userDataId?: string;
  name: string;
  imageurl?: string;
  description: string;
  yearProduction: string;
  withDriver: boolean;
  price: number;

  seat: number;
  transmission: string;
  typefuel: string;
  ac: boolean;

  city: string;
  status: string;

  createAt?: Date;
}
