import React, { createContext, useContext, useState, ReactNode } from "react";

interface GContextType {
  value: string;
  setValue: (newValue: string) => void;
}

// Create the context with a default value
const GContext = createContext<GContextType | undefined>(undefined);

// Create a provider component
const GProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>("Initial Value");

  return (
    <GContext.Provider value={{ value, setValue }}>
      {children}
    </GContext.Provider>
  );
};

// Custom hook to use the context
const useGContext = (): GContextType => {
  const context = useContext(GContext);
  if (!context) {
    throw new Error("useGContext must be used within a GProvider");
  }
  return context;
};

export { GProvider, useGContext };
