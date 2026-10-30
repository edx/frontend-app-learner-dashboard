/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';

import { Hyperlink } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { useFormatDate } from './formatDate';
import Banner from './Banner';
import messages from './messages';
import { useCourseData } from '@src/hooks';

const CourseBanner = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  const {
    isVerified,
    isAuditAccessExpired,
    canUpgrade,
    coursewareAccess = {},
  } = courseData?.enrollment || {};
  const courseRun = courseData?.courseRun || {};
  const { formatMessage } = useIntl();
  const formatDate = useFormatDate();

  const { hasUnmetPrerequisites, isStaff, isTooEarly } = coursewareAccess;

  if (isVerified) { return null; }

  return (
    <>
      {isAuditAccessExpired
        && (canUpgrade ? (
          <Banner>
            {formatMessage(messages.auditAccessExpired)}
            {'  '}
            {formatMessage(messages.upgradeToAccess)}
          </Banner>
        ) : (
          <Banner>
            {formatMessage(messages.auditAccessExpired)}
            {'  '}
            <Hyperlink isInline destination="">
              {formatMessage(messages.findAnotherCourse)}
            </Hyperlink>
          </Banner>
        ))}

      {courseRun.isStarted && !courseRun.isArchived && !canUpgrade && (
        <Banner>
          {formatMessage(messages.upgradeDeadlinePassed)}
          {'  '}
          <Hyperlink isInline destination={courseRun.marketingUrl || ''}>
            {formatMessage(messages.exploreCourseDetails)}
          </Hyperlink>
        </Banner>
      )}

      {(!isStaff && isTooEarly && courseRun.startDate) && (
        <Banner>
          {formatMessage(messages.courseHasNotStarted, {
            startDate: formatDate(courseRun.startDate),
          })}
        </Banner>
      )}
      {(!isStaff && hasUnmetPrerequisites) && (
        <Banner>{formatMessage(messages.prerequisitesNotMet)}</Banner>
      )}
    </>
  );
};

CourseBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseBanner;
