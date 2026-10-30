import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import EmptyCourse from '.';
import messages from './messages';
import {
  exploreCoursesViewedCohesion,
  exploreCoursesClickedCohesion,
} from '../tracking/trackers/exploreCourses';
import { formatMessage } from '@src/testUtils';

const mockCourseSearchUrl = '/course-search-url';

beforeAll(() => {
  Object.defineProperty(window.crypto, 'randomUUID', {
    configurable: true,
    value: jest.fn(() => 'test-correlation-id'),
  });
});

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({
    ref: jest.fn(),
    inView: true,
  })),
}));

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(() => ({
    data: {
      platformSettings: {
        courseSearchUrl: mockCourseSearchUrl,
      },
    },
  })),
}));

jest.mock('@src/data/services/lms/urls', () => ({
  baseAppUrl: (path) => `mock-base-app-url${path}`,
}));

jest.mock('../tracking/trackers/exploreCourses', () => ({
  exploreCoursesViewedCohesion: jest.fn(),
  exploreCoursesClickedCohesion: jest.fn(),
}));

describe('NoCoursesView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display image, heading and button', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);

    const image = screen.getByRole('img', {
      name: formatMessage(messages.bannerAlt),
    });

    expect(image).toBeInTheDocument();
  });

  it('should display heading and prompt', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);

    expect(
      screen.getByText(formatMessage(messages.lookingForChallengePrompt)),
    ).toBeInTheDocument();

    expect(
      screen.getByText(formatMessage(messages.exploreCoursesPrompt)),
    ).toBeInTheDocument();
  });

  it('should display button with correct URL', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);

    const button = screen.getByRole('link', {
      name: formatMessage(messages.exploreCoursesButton),
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      'href',
      `mock-base-app-url${mockCourseSearchUrl}`,
    );
  });

  it('should fire cohesion viewed event on load', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);

    expect(exploreCoursesViewedCohesion).toHaveBeenCalledWith(
      'test-correlation-id',
    );
  });

  it('should fire cohesion click event when explore courses CTA is clicked', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);

    const button = screen.getByRole('link', {
      name: formatMessage(messages.exploreCoursesButton),
    });

    fireEvent.click(button);

    expect(exploreCoursesClickedCohesion).toHaveBeenCalledWith(
      'test-correlation-id',
    );
  });
});