export interface Product {
  id: number;
  price: number;
  description: string;
  stock: number;
}

export interface PartialProduct {
  price: number;
  description: string;
  stock: number;
}
