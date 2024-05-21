import React, { createContext, useState, ReactNode } from "react";
import { Order } from "../types/models";
export interface OrderContextType {
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}
export const OrderContext = createContext<OrderContextType | undefined>(
  undefined,
);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [order, setOrder] = useState<Order | null>(
    JSON.parse(localStorage.getItem("order")) || null,
  );

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
