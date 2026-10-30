import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { formatMessage } from '../testUtils';

import EmptyCourse from '.';
import messages from './messages';
import { exploreCoursesViewedCohesion, exploreCoursesClickedCohesion } from '../tracking/trackers/exploreCourses';

const courseSearchUrl = '/course-search-url';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({
    ref: jest.fn(),
    inView: jest.fn(),
  })),
}));

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(() => ({
    data: {
      platformSettings: {
        courseSearchUrl,
      },
    },
  })),
}), { virtual: true });

jest.mock('data/services/lms/urls', () => ({
  baseAppUrl: (path) => `mock-base-app-url${path}`,
}), { virtual: true });

jest.mock('../tracking/trackers/exploreCourses', () => ({
  exploreCoursesViewedCohesion: jest.fn(),
  exploreCoursesClickedCohesion: jest.fn(),
}));

describe('NoCoursesView', () => {
  it('should display image, heading and button', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const image = screen.getByRole('img', { alt: formatMessage(messages.bannerAlt) });
    expect(image).toBeInTheDocument();
  });
  it('should display heading and prompt', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const heading = screen.getByText(formatMessage(messages.lookingForChallengePrompt));
    const prompt = screen.getByText(formatMessage(messages.exploreCoursesPrompt));
    expect(heading).toBeInTheDocument();
    expect(prompt).toBeInTheDocument();
  });
  it('should display button', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const button = screen.getByRole('link', { name: formatMessage(messages.exploreCoursesButton) });
    expect(button).toBeInTheDocument();
    expect(button.href).toContain(`mock-base-app-url${courseSearchUrl}`);
  });
  it('should fire cohesion viewed event on load', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    expect(exploreCoursesViewedCohesion).toHaveBeenCalled();
  });
  it('should fire cohesion click event when explore courses CTA is clicked', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const button = screen.getByRole('link', { name: formatMessage(messages.exploreCoursesButton) });
    fireEvent.click(button);
    expect(exploreCoursesClickedCohesion).toHaveBeenCalled();
  });
});
