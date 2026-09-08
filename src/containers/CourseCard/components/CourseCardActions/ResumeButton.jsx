import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { EXECUTIVE_EDUCATION_COURSE_MODES } from 'data/constants/course';
import { baseAppUrl } from 'data/services/lms/urls';
import track from 'tracking';
import { useCourseTrackingEvent, useCourseData } from 'hooks';
import { useInitializeLearnerHome } from 'data/hooks';
import useActionDisabledState from '../hooks';
import ActionButton from './ActionButton';
import { buildTrackingQuery } from './utils';
import messages from './messages';

export const ResumeButton = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const { data: learnerData } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);
  const resumeUrl = courseData?.courseRun?.resumeUrl;
  const execEdTrackingParam = useMemo(() => {
    const isExecEd2UCourse = EXECUTIVE_EDUCATION_COURSE_MODES.includes(courseData.enrollment.mode);
    if (!isExecEd2UCourse) { return ''; }

    const { authOrgId } = learnerData?.enterpriseDashboard || {};
    const courseUuid = courseData.courseRun?.courseUuid;
    return buildTrackingQuery(authOrgId, courseUuid);
  }, [courseData.enrollment.mode, courseData.courseRun, learnerData.enterpriseDashboard]);
  const { disableResumeCourse } = useActionDisabledState(cardId);

  const handleClick = useCourseTrackingEvent(
    track.course.enterCourseClicked,
    cardId,
    baseAppUrl(resumeUrl) + execEdTrackingParam,
  );
  return (
    <ActionButton
      disabled={disableResumeCourse}
      as="a"
      href="#"
      onClick={handleClick}
    >
      {formatMessage(messages.resume)}
    </ActionButton>
  );
};
ResumeButton.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default ResumeButton;
