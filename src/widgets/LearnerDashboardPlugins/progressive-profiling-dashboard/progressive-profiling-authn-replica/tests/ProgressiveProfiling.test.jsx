import React from 'react';
import {
  act, render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import {
  trackProgressiveProfilingSkipLinkClick,
  trackProgressiveProfilingSubmitClick,
} from '../../../tracking/trackers/progressiveProfiling';
import getThirdPartyAuthContext from '../service/getThirdPartyAuthContext';
import useProgressiveProfilingForm from '../../hooks/useProgressiveProfilingForm';
import ProgressiveProfilingPage from '../ProgressiveProfiling';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getAppConfig: jest.fn(() => ({
    SITE_NAME: 'Test Site',
    AUTHN_PROGRESSIVE_PROFILING_SUPPORT_LINK: null,
  })),
  getAuthenticatedUser: jest.fn(() => ({
    username: 'testuser',
    fullName: 'Test User',
  })),
  getAuthenticatedHttpClient: jest.fn(() => ({})),
}));

jest.mock('../../hooks/useProgressiveProfilingForm');

jest.mock('../service/getThirdPartyAuthContext');

jest.mock('../../../tracking/trackers/progressiveProfiling', () => ({
  trackProgressiveProfilingSkipLinkClick: jest.fn(),
  trackProgressiveProfilingSubmitClick: jest.fn(),
  trackProgressiveProfilingSupportLinkClick: jest.fn(),
  trackProgressiveProfilingPageViewed: jest.fn(),
}));

// eslint-disable-next-line react/prop-types, func-names
jest.mock('../base-container', () => function ({ children }) {
  return <div data-testid="base-container">{children}</div>;
});
// eslint-disable-next-line react/prop-types, func-names
jest.mock('../ProgressiveProfilingPageModal', () => function ({ isOpen }) {
  return isOpen ? <div data-testid="skip-modal" /> : null;
});

const mockSubmit = jest.fn();

const defaultHookReturn = {
  loadState: 'complete',
  submitState: 'default',
  error: null,
  values: {},
  fieldList: [],
  onChangeHandler: jest.fn(),
  submit: mockSubmit,
};

const renderPage = async () => {
  let result;
  await act(async () => {
    result = render(
      <IntlProvider locale="en">
        <ProgressiveProfilingPage />
      </IntlProvider>,
    );
  });
  return result;
};

describe('ProgressiveProfilingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useProgressiveProfilingForm.mockReturnValue(defaultHookReturn);
    getThirdPartyAuthContext.mockResolvedValue({});
  });

  it('renders the page heading', async () => {
    await renderPage();
    expect(screen.getByText('A few questions for you will help us get smarter.')).toBeInTheDocument();
  });

  it('renders the Submit and Skip buttons', async () => {
    await renderPage();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Skip for now')).toBeInTheDocument();
  });

  it('calls getThirdPartyAuthContext on mount', async () => {
    await renderPage();
    expect(getThirdPartyAuthContext).toHaveBeenCalledTimes(1);
  });

  it('navigates to / and fires tracking on successful submit', async () => {
    mockSubmit.mockResolvedValue(true);
    await renderPage();

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(trackProgressiveProfilingSubmitClick).toHaveBeenCalledWith({
        isGenderSelected: false,
        isYearOfBirthSelected: false,
        isLevelOfEducationSelected: false,
        isWorkExperienceSelected: false,
      });
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  it('does not navigate when submit fails', async () => {
    mockSubmit.mockResolvedValue(false);
    await renderPage();

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('opens the skip modal when Skip is clicked', async () => {
    await renderPage();
    expect(screen.queryByTestId('skip-modal')).toBeNull();

    fireEvent.click(screen.getByText('Skip for now'));

    expect(trackProgressiveProfilingSkipLinkClick).toHaveBeenCalled();
    expect(screen.getByTestId('skip-modal')).toBeInTheDocument();
  });

  it('shows an error alert when the hook returns an error', async () => {
    useProgressiveProfilingForm.mockReturnValue({
      ...defaultHookReturn,
      error: new Error('Something went wrong'),
    });

    await renderPage();

    expect(screen.getByText("We couldn't update your profile")).toBeInTheDocument();
    expect(screen.getByText('An error occurred. You can complete your profile in settings at any time.')).toBeInTheDocument();
  });

  it('disables submit when submitState is pending', async () => {
    useProgressiveProfilingForm.mockReturnValue({
      ...defaultHookReturn,
      submitState: 'pending',
    });

    const { container } = await renderPage();

    // In pending state Paragon replaces the label with a spinner; query by class instead
    expect(container.querySelector('.pp-page__button-width')).toBeDisabled();
  });

  it('does not render the support link when config is unset', async () => {
    await renderPage();
    expect(screen.queryByText('Learn more about how we use this information.')).toBeNull();
  });
});
