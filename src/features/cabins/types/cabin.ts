export interface ICabin {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
  createdAt: string;
}

export interface ICabinFormData {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image?: File[] | string;
}
