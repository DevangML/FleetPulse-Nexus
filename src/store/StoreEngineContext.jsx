import React, { createContext, useContext, useState } from 'react';

const StoreEngineContext = createContext(undefined);

export function StoreEngineProvider({ children }) {
  const [engine, setEngine] = useState('zustand');

  return (
    <StoreEngineContext.Provider value={{ engine, setEngine }}>
      {children}
    </StoreEngineContext.Provider>
  );
}

export function useStoreEngine() {
  const context = useContext(StoreEngineContext);
  if (!context) {
    throw new Error('useStoreEngine must be used within StoreEngineProvider');
  }
  return context;
}
