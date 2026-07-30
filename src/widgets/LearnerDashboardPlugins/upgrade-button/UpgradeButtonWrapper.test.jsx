import { render, screen } from '@testing-library/react';

import { useCourseData, useEntitlementInfo } from '@src/hooks';
import UpgradeButtonWrapper from './UpgradeButtonWrapper';

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(),
  useEntitlementInfo: jest.fn(),
}));

jest.mock('./UpgradeButton', () => ({ cardId }) => (
  <button data-testid="upgrade-button">
    Upgrade {cardId}
  </button>
));

describe('UpgradeButtonWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useCourseData.mockReturnValue({
      enrollment: {
        isVerified: false,
        isExecEd2UCourse: false,
      },
    });

    useEntitlementInfo.mockReturnValue({
      isEntitlement: false,
    });
  });

  it('renders UpgradeButton when course is eligible', () => {
    render(<UpgradeButtonWrapper cardId="cardId" />);

    expect(screen.getByTestId('upgrade-button')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upgrade cardid/i })).toBeInTheDocument();
  });

  it('does not render UpgradeButton when the course is verified', () => {
    useCourseData.mockReturnValue({
      enrollment: {
        isVerified: true,
        isExecEd2UCourse: false,
      },
    });

    render(<UpgradeButtonWrapper cardId="cardId" />);

    expect(screen.queryByTestId('upgrade-button')).not.toBeInTheDocument();
  });

  it('does not render UpgradeButton when the course is an entitlement', () => {
    useEntitlementInfo.mockReturnValue({
      isEntitlement: true,
    });

    render(<UpgradeButtonWrapper cardId="cardId" />);

    expect(screen.queryByTestId('upgrade-button')).not.toBeInTheDocument();
  });

  it('does not render UpgradeButton when the course is an ExecEd course', () => {
    useCourseData.mockReturnValue({
      enrollment: {
        isVerified: false,
        isExecEd2UCourse: true,
      },
    });

    render(<UpgradeButtonWrapper cardId="cardId" />);

    expect(screen.queryByTestId('upgrade-button')).not.toBeInTheDocument();
  });
});
