import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KContextType {
    value: string,
    setValue: (newValue:string) => void;
}

// Create the context with a default value
const KContext = createContext<KContextType | undefined>(undefined);

// Create a provider component
const KProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>('Initial Value');

  return (
    <KContext.Provider value={{ value, setValue }}>
      {children}
    </KContext.Provider>
  );
};


// Custom hook to use the context
const useKContext = (): KContextType => {
    const context = useContext(KContext);
    if (!context) {
      throw new Error("useKContext must be used within a KProvider");
    }
    return context;
  };
  
  export { KProvider, useKContext };