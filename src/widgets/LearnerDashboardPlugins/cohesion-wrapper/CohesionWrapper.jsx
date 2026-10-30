import { useState, useEffect } from 'react';
import { logError, logInfo } from '@openedx/frontend-base';

const CohesionWrapper = () => {
  const [isLoaded, setLoaded] = useState(false);

  // set pageType value
  window.chsn_pageType = 'lms-homepage';

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = 'https://www.edx.org/beam-wrapper.js';
    script.dataset.testId = 'cohesion-test';

    script.onload = () => {
      if (window.tagular && typeof window.tagular === 'function') {
        logInfo('Cohesion script loaded successfully!');
      } else {
        // in the case that the script successfully loaded but tagular is still not found
        logError('window.tagular not found after Cohesion script load.');
      }
    };

    script.onerror = (e) => {
      logError('Cohesion script failed to load', e);
    };

    head.appendChild(script);
    setLoaded(true);
  }, [isLoaded]);

  return null;
};

export default CohesionWrapper;
