export interface Product {
  id?: number;
  title: string;
  price: number;
  stock: number;
  stockUnit: 'NUMBER' | 'KG' | 'LITRE';
}