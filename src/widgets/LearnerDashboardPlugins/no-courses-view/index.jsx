/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useRef } from 'react';
import { useIntl } from '@openedx/frontend-base';
import { Button, Image } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { useInView } from 'react-intersection-observer';

import { useInitializeLearnerHome } from '@src/data/hooks';
import { baseAppUrl } from '@src/data/services/lms/urls';

import emptyCourseSVG from '@src/assets/empty-course.svg';
import { exploreCoursesViewedCohesion, exploreCoursesClickedCohesion } from '../tracking/trackers/exploreCourses';

import messages from './messages';
import './index.scss';

const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { data } = useInitializeLearnerHome();
  const courseSearchUrl = data?.platformSettings?.courseSearchUrl || '';
  const viewCorrelationIdRef = useRef(window.crypto.randomUUID());
  const hasViewEventFired = useRef(false);

  const { ref: exploreCoursesRef, inView } = useInView({ triggerOnce: true });

  const handleExploreCoursesViewed = useCallback(() => {
    exploreCoursesViewedCohesion(viewCorrelationIdRef.current);
  }, []);

  const handleExploreCoursesClick = () => {
    exploreCoursesClickedCohesion(viewCorrelationIdRef.current);
  };

  useEffect(() => {
    if (!hasViewEventFired.current && inView) {
      handleExploreCoursesViewed();
      hasViewEventFired.current = true;
    }
  }, [handleExploreCoursesViewed, inView]);

  return (
    <div
      id="no-courses-content-view"
      className="d-flex align-items-center justify-content-center mb-4.5"
    >
      <Image src={emptyCourseSVG} alt={formatMessage(messages.bannerAlt)} />
      <h3 className="h1">
        {formatMessage(messages.lookingForChallengePrompt)}
      </h3>
      <p>
        {formatMessage(messages.exploreCoursesPrompt)}
      </p>
      <Button
        variant="brand"
        as="a"
        onClick={handleExploreCoursesClick}
        href={baseAppUrl(courseSearchUrl)}
        iconBefore={Search}
        ref={exploreCoursesRef}
      >
        {formatMessage(messages.exploreCoursesButton)}
      </Button>
    </div>
  );
};

export default NoCoursesView;
