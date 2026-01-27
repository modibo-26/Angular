import { CartItem } from "./cart";
import { Product } from "./products";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdDate: Date;
  userId: string;
}