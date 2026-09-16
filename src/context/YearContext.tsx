import React, { createContext, useContext, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { years, YearKey, CURRENT_YEAR, AVAILABLE_YEARS } from '../config/years';
import { getYearData } from '../data';

type YearData = ReturnType<typeof getYearData>;

type YearContextValue = {
  year: YearKey;
  config: (typeof years)[YearKey];
  data: YearData;
};

const YearContext = createContext<YearContextValue | null>(null);

export const YearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { year: yearParam } = useParams<{ year: string }>();

  if (!yearParam || !isValidYear(yearParam)) {
    return <Navigate to={`/${CURRENT_YEAR}/`} replace />;
  }

  const year = yearParam as YearKey;
  const config = years[year];
  const data = getYearData(year);

  const value = useMemo(() => ({ year, config, data }), [year]);

  return (
    <YearContext.Provider value={value}>
      {children}
    </YearContext.Provider>
  );
};

function isValidYear(value: string): value is YearKey {
  return (AVAILABLE_YEARS as readonly string[]).includes(value);
}

export function useYear(): YearContextValue {
  const ctx = useContext(YearContext);
  if (!ctx) {
    throw new Error('useYear must be used within a YearProvider');
  }
  return ctx;
}
