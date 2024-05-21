import { Customer, Order } from "./models";

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
