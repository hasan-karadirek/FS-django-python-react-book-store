"use client";
import React, { createContext, useState, ReactNode } from "react";
import { Order } from "../types/models";
import { getLocalStorage } from "../utils/LocalStorage";
export interface OrderContextType {
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}
export const OrderContext = createContext<OrderContextType | null>(
  null
);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [order, setOrder] = useState<Order | null>(
     JSON.parse(getLocalStorage("order") ?? "null")
  );

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
