import { render, RenderResult, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ProgramProgressInfo from './ProgramProgressInfo';
import messages from './messages';

jest.mock('./UpgradeButton', () => ({
  UpgradeAllButton: 'UpgradeAllButton',
}));

const defaultProps = {
  allCoursesCompleted: true,
  totalCoursesInProgram: 3,
};

const renderComponent = (props = {}): RenderResult => render(
  <IntlProvider locale="en">
    <ProgramProgressInfo {...defaultProps} {...props} />
  </IntlProvider>,
);

describe('ProramProgressInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct text when all courses have been completed for a program', () => {
    renderComponent();

    expect(screen.getByText(messages.programProgressCompleteHeader.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.programProgressCompleteText.defaultMessage)).toBeInTheDocument();
  });

  it('renders the correct text when the user has NOT completed all of the courses in a program', () => {
    renderComponent({
      ...defaultProps,
      allCoursesCompleted: false,
    });

    expect(screen.getByText(messages.programProgressIncompleteHeader.defaultMessage)).toBeInTheDocument();
    expect(screen.getByTestId('program-incomplete-info-text')).toBeInTheDocument();
  });
});
