/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import PropTypes from 'prop-types';

import { useCourseData, useEntitlementInfo } from '@src/hooks';
import UpgradeButton from './UpgradeButton';

const UpgradeButtonWrapper = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const { isEntitlement } = useEntitlementInfo(courseData);
  const {
    isVerified,
    isExecEd2UCourse,
  } = courseData?.enrollment || {};

  if (!(isEntitlement || isVerified || isExecEd2UCourse)) {
    return <UpgradeButton cardId={cardId} />;
  }
  return null;
};

UpgradeButtonWrapper.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default UpgradeButtonWrapper;
