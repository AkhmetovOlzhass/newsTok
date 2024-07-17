'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  filter: string;
  changeFilter: (newFilter: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within a FilterProvider');
  return context;
};

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filter, setFilter] = useState<string>('DigitalBusiness');

  const changeFilter = (newFilter: string) => {
    
    
    setFilter(newFilter);
  };

  return (
    <FilterContext.Provider value={{ filter, changeFilter }}>
      {children}
    </FilterContext.Provider>
  );
};