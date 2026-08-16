import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
export const GlobalThemeContext = createContext();

export function GlobalThemeProvider({ children }) {
  const [theme, setTheme] = useState('STANDARD');

  // TODO: Mettl Archetype 7 - Global Context API Provider
  // METTL TODO 1: Provide `theme` and `setTheme` as the value prop to GlobalThemeContext.Provider.
  // METTL TODO 2: Wrap the `children` in this Provider.

  return (
    <>
      <div style={{ color: 'var(--text-muted)', padding: '10px' }}>
        Awaiting your implementation for the Mettl Context API Challenge...
      </div>
      {children}
    </>
  );
}

// Custom Hook to consume context
export function useGlobalTheme() {
  // METTL TODO 3: Implement useContext hook to consume GlobalThemeContext.
  // Throw an error if used outside of the Provider (common Mettl test).
  return { theme: 'STANDARD', setTheme: () => {} }; 
}
