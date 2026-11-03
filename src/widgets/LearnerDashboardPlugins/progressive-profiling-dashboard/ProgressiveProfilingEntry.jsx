import React, { useEffect, useState } from 'react';
import { getAuthenticatedUser } from '@openedx/frontend-base';

import ProgressiveProfilingModal from './ProgressiveProfilingModal';
import useProgressiveProfilingTrigger from './hooks/useProgressiveProfilingTrigger';
import useClearProgressiveProfilingQueryParams from './hooks/useClearProgressiveProfilingQueryParams';
import { trackProgressiveProfilingQuestionaireModalFormOpened } from '../tracking/trackers/progressiveProfiling';

const ProgressiveProfilingEntry = () => {
  const [isOpen, setIsOpen] = useState(false);

  const username = getAuthenticatedUser()?.username;

  const { shouldOpen } = useProgressiveProfilingTrigger();
  const clearTrigger = useClearProgressiveProfilingQueryParams();

  useEffect(() => {
    if (shouldOpen && username) {
      setIsOpen(true);
      trackProgressiveProfilingQuestionaireModalFormOpened({ host: window.location.origin });
    }
  }, [shouldOpen, username]);

  return (
    <ProgressiveProfilingModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      clearTrigger={clearTrigger}
    />
  );
};

export { ProgressiveProfilingEntry };
