import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import useActionDisabledState from '../hooks';
import BeginCourseButton from './BeginCourseButton';

jest.mock('hooks', () => ({
  useCourseData: jest.fn().mockReturnValue({
    enrollment: { mode: 'executive-education' },
    courseRun: { homeUrl: 'home-url', courseUuid: 'test-course-uuid' },
  }),
  useCourseTrackingEvent: jest.fn().mockReturnValue({
    trackCourseEvent: jest.fn(),
  }),
}));

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({
    data: {
      enterpriseDashboard: {
        authOrgId: 'test-org-id',
      },
    },
  }),
}));

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('../hooks', () => jest.fn(() => ({ disableBeginCourse: false })));

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

const homeUrl = 'home-url';

const props = {
  cardId: 'cardId',
};

const renderComponent = () => render(<IntlProvider locale="en"><BeginCourseButton {...props} /></IntlProvider>);

describe('BeginCourseButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initiliaze hooks', () => {
    it('initializes course run data with cardId', () => {
      renderComponent();
      expect(useCourseData).toHaveBeenCalledWith(props.cardId);
    });
    it('loads disabled states for begin action from action hooks', () => {
      renderComponent();
      expect(useActionDisabledState).toHaveBeenCalledWith(props.cardId);
    });
  });
  describe('behavior', () => {
    describe('disabled', () => {
      it('should be disabled', () => {
        useActionDisabledState.mockReturnValueOnce({ disableBeginCourse: true });
        renderComponent();
        const button = screen.getByRole('button', { name: 'Begin Course' });
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('enabled', () => {
      it('should be enabled', () => {
        renderComponent();
        const button = screen.getByRole('button', { name: 'Begin Course' });
        expect(button).not.toHaveClass('disabled');
        expect(button).not.toHaveAttribute('aria-disabled', 'true');
      });
      it('tracks enter course clicked event with exec ed and course_id params', () => {
        renderComponent();
        expect(useCourseTrackingEvent).toHaveBeenCalledWith(
          track.course.enterCourseClicked,
          props.cardId,
          `${homeUrl}?org_id=test-org-id&course_id=test-course-uuid`,
        );
      });
      it('omits course_id if courseUuid is not available', () => {
        useCourseData.mockReturnValueOnce({
          enrollment: { mode: 'executive-education' },
          courseRun: { homeUrl },
        });
        renderComponent();
        expect(useCourseTrackingEvent).toHaveBeenCalledWith(
          track.course.enterCourseClicked,
          props.cardId,
          `${homeUrl}?org_id=test-org-id`,
        );
      });
    });
  });
});
