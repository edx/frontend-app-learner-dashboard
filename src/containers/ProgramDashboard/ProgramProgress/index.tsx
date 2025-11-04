import React from 'react';
import { ProgramProgressContextProvider } from './ProgramProgressProvider.tsx';
import ProgramProgress from './ProgramProgress';

const ProgramProgressWithProvider = () => (
  <ProgramProgressContextProvider>
    <ProgramProgress />
  </ProgramProgressContextProvider>
);

export default ProgramProgressWithProvider;
