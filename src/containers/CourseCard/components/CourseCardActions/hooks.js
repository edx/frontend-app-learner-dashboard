import React from 'react';

import { handleEvent } from 'data/services/segment/utils';
import { eventNames } from 'data/services/segment/constants';

export const useCourseCardActionData = () => {
  const trackUpgradeClick = React.useCallback(
    () => handleEvent(eventNames.upgradeCourse, {
      pageName: 'learner_home',
      linkType: 'button',
      linkCategory: 'green_upgrade',
    }),
    [],
  );

  return {
    trackUpgradeClick,
  };
};

export default useCourseCardActionData;
