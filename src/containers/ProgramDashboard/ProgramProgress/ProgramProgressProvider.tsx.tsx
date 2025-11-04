import React, {
  createContext, ReactNode, useMemo, useState,
} from 'react';
import { ProgramProgressData } from '../data/types';

export interface ProgramProgressProviderProps {
  children: ReactNode,
}

export interface ProgramProgressContextValueType {
  programProgressData: ProgramProgressData
  setProgramProgressData: (data: ProgramProgressData) => void,
}

const defaultContextValue: ProgramProgressContextValueType = {
  programProgressData: {
    urls: {
      programListingUrl: undefined,
      trackSelectionUrl: undefined,
      commerceApiUrl: undefined,
      buyButtonUrl: undefined,
      programRecordUrl: undefined,
    },
    programData: null,
    courseData: null,
  },
  setProgramProgressData: () => {},
};

export const ProgramProgressContext = createContext<ProgramProgressContextValueType>(defaultContextValue);

export const ProgramProgressContextProvider: React.FC<ProgramProgressProviderProps> = ({ children }) => {
  const [programProgressData, setProgramProgressData] = useState(defaultContextValue.programProgressData);

  const memoValue = useMemo(():ProgramProgressContextValueType => ({
    programProgressData,
    setProgramProgressData,
  }), [programProgressData, setProgramProgressData]);

  return (
    <ProgramProgressContext.Provider
      value={memoValue}
    >
      {children}
    </ProgramProgressContext.Provider>
  );
};

export default {
  ProgramProgressContextProvider,
  ProgramProgressContext,
};
