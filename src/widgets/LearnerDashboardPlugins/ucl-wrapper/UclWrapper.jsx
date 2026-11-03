import { useState, useEffect } from 'react';
import { logError, logInfo } from '@openedx/frontend-base';

const UclWrapper = () => {
  const [isLoaded, setLoaded] = useState(false);

  // eslint-disable-next-line no-underscore-dangle
  window._UCL = {
    identity: '2u-edx-learner-dashboard',
  };

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = 'https://affiliate-bundle.api.highereducation.com/latest/UCL.adapter.js';
    script.dataset.testId = 'ucl-test';
    script.async = true;

    script.onload = () => {
      if (window.UCL && typeof window.UCL === 'function') {
        logInfo('UCL script loaded successfully!');
      } else {
        // in the case that the script successfully loaded but UCL is still not found
        logError('window.UCL not found after UCL script load.');
      }
    };

    script.onerror = (e) => {
      logError('UCL script failed to load', e);
    };

    head.appendChild(script);
    setLoaded(true);
  }, [isLoaded]);

  return null;
};

export default UclWrapper;
