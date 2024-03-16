import { Product } from "./product.type.js";
import { User } from "./user.type.js";

export interface Order {
  id?: number;
  productId: number;
  product?: Product;
  orderedAt: Date;
  quantity: number;
  quantityUnit: 'NUMBER' | 'KG' | 'LITRE';
  subtotal: number;
  user?: User;
  userId: number;
  pending?: boolean;
}