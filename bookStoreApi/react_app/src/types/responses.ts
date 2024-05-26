import { Book, Customer, Order } from "./models";

export interface RegisterResponse {
  customer: Customer;
  token: string;
  order: Order;
}

export interface LoginResponse {
  token: string;
  customer: Customer;
  order: Order | null;
}

export interface CheckoutResponse {
  order: Order;
  redirectUrl: string;
}
export interface BookListResponse {
  page: Book[];
  total: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}