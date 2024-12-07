'use client';
import React, { createContext, useState, ReactNode } from "react";
import { CustomError } from "../hooks/useFetch";
export interface ErrorContextType {
  customError: CustomError | null;
  setCustomError: React.Dispatch<React.SetStateAction<CustomError | null>>;
}
export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [customError, setCustomError] = useState<CustomError | null>(null);

  return (
    <ErrorContext.Provider value={{ customError, setCustomError }}>
      {children}
    </ErrorContext.Provider>
  );
};
