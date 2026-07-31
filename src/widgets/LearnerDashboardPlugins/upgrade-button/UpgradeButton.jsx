/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@openedx/frontend-base';
import { Button } from '@openedx/paragon';
import { Locked } from '@openedx/paragon/icons';

import { useCourseData, useCourseTrackingEvent } from '@src/hooks';
import { upgradeClicked } from '../tracking/trackers/upgradeButton';

import { useIsCollapsed, useActionDisabledState } from './data/hooks';
import messages from './messages';

export const UpgradeButton = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const courseRun = useCourseData(cardId)?.courseRun || {};
  const { upgradeUrl } = courseRun;
  const org = courseRun.org || '';
  const courseName = courseRun.title || '';
  const { disableUpgradeCourse } = useActionDisabledState(cardId);
  const trackUpgradeClick = useCourseTrackingEvent(
    upgradeClicked,
    cardId,
    org,
    courseName,
    upgradeUrl,
  );

  const isSmall = useIsCollapsed();

  const enabledProps = {
    as: 'a',
    href: upgradeUrl,
    onClick: trackUpgradeClick,
  };

  return (
    <Button
      iconBefore={Locked}
      variant="outline-primary"
      disabled={disableUpgradeCourse}
      {...!disableUpgradeCourse && enabledProps}
      {...isSmall && { size: 'sm' }}
    >
      {formatMessage(messages.upgrade)}
    </Button>
  );
};
UpgradeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default UpgradeButton;
