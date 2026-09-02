import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { EXECUTIVE_EDUCATION_COURSE_MODES } from 'data/constants/course';

import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import { useInitializeLearnerHome } from 'data/hooks';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import { buildTrackingQuery } from './utils';
import messages from './messages';

export const BeginCourseButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { data: learnerData } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);
  const homeUrl = courseData?.courseRun?.homeUrl;
  const execEdTrackingParam = useMemo(() => {
    const isExecEd2UCourse = EXECUTIVE_EDUCATION_COURSE_MODES.includes(courseData.enrollment.mode);
    if (!isExecEd2UCourse) { return ''; }

    const { authOrgId } = learnerData?.enterpriseDashboard || {};
    const courseUuid = courseData.courseRun?.courseUuid;
    return buildTrackingQuery(authOrgId, courseUuid);
  }, [courseData.enrollment.mode, courseData.courseRun, learnerData.enterpriseDashboard]);
  const { disableBeginCourse } = useActionDisabledState(cardId);

  const handleClick = useCourseTrackingEvent(
    track.course.enterCourseClicked,
    cardId,
    homeUrl + execEdTrackingParam,
  );
  return (
    <ActionButton
      disabled={disableBeginCourse}
      as="a"
      href="#"
      onClick={handleClick}
    >
      {formatMessage(messages.beginCourse)}
    </ActionButton>
  );
};
BeginCourseButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default BeginCourseButton;
