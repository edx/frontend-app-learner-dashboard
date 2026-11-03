import { logError } from '@openedx/frontend-base';
import { handleCorrelationIDCookie } from '../cookie';

import {
  BUTTON_ELEMENT_TYPE,
  LOCATION_LEARNER_HOME,
  EXPLORE_COURSES_HTML_ID,
  EXPLORE_COURSES_EVENT_NAME,
  EXPLORE_COURSES_EVENT_TEXT,
} from '../constants';

export const exploreCoursesViewedCohesion = (viewCorrelationId) => {
  if (window.tagular && typeof window.tagular === 'function') {
    window.tagular?.('beam', {
      '@type': 'redventures.usertracking.v3.ElementViewed',
      viewCorrelationId,
      webElement: {
        elementType: BUTTON_ELEMENT_TYPE,
        htmlId: EXPLORE_COURSES_HTML_ID,
        location: LOCATION_LEARNER_HOME,
        name: EXPLORE_COURSES_EVENT_NAME,
        text: EXPLORE_COURSES_EVENT_TEXT,
        position: '1',
      },
    });
  } else {
    logError('Cohesion script failed to load before CTA was viewed');
  }
};

export const exploreCoursesClickedCohesion = (viewCorrelationId) => {
  const correlationId = handleCorrelationIDCookie();

  if (window.tagular && typeof window.tagular === 'function') {
    window.tagular?.('beam', {
      '@type': 'redventures.usertracking.v3.ElementClicked',
      correlationId,
      viewCorrelationId,
      webElement: {
        elementType: BUTTON_ELEMENT_TYPE,
        htmlId: EXPLORE_COURSES_HTML_ID,
        location: LOCATION_LEARNER_HOME,
        name: EXPLORE_COURSES_EVENT_NAME,
        text: EXPLORE_COURSES_EVENT_TEXT,
        position: '1',
      },
    });
  } else {
    logError('Cohesion script failed to load before CTA was clicked');
  }
};
