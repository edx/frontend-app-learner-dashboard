import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { render, RenderResult, screen } from '@testing-library/react';
import UpgradeAllButton from './UpgradeAllButton';
import { ProgramProgressContext } from '../ProgramProgressProvider.tsx';
import messages from './messages';

const mockBuyButtonUrl = 'http://test-buy-url.com';
const mockCurrency = 'USD';
const mockDiscountedPrice = 500.00;
const mockListPrice = 800.00;

const defaultContextValue = {
  programProgressData: {
    urls: {
      programListingUrl: undefined,
      trackSelectionUrl: undefined,
      commerceApiUrl: undefined,
      buyButtonUrl: mockBuyButtonUrl,
      programRecordUrl: undefined,
    },
    programData: {
      discountData: null,
    },
    courseData: {},
  },
  setProgramProgressData: () => {},
};

const renderComponent = (contextValue): RenderResult => render(
  <IntlProvider locale="en">
    <ProgramProgressContext.Provider value={contextValue}>
      <UpgradeAllButton />
    </ProgramProgressContext.Provider>
  </IntlProvider>,
);

describe('UpgradeAllButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders the button with the correct text and link in the NOT discounted state', () => {
    const contextValue = {
      ...defaultContextValue,
      programProgressData: {
        ...defaultContextValue.programProgressData,
        programData: {
          discountData: {
            currency: mockCurrency,
            isDiscounted: false,
            totalInclTaxExclDiscounts: mockListPrice,
            totalInclTax: mockListPrice,
          },
        },
      },
    };

    renderComponent(contextValue);

    const button = screen.getByTestId('upgrade-all-button');

    expect(button).toHaveTextContent(messages.upgradeAllRemainingCoursesButtonText.defaultMessage);

    expect(button).toHaveAttribute('href', mockBuyButtonUrl);

    expect(screen.getByText(`$${mockListPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  it('renders the button with the correct text and link in the discounted state', () => {
    const contextValue = {
      ...defaultContextValue,
      programProgressData: {
        ...defaultContextValue.programProgressData,
        programData: {
          discountData: {
            currency: mockCurrency,
            isDiscounted: true,
            totalInclTaxExclDiscounts: mockListPrice,
            totalInclTax: mockDiscountedPrice,
          },
        },
      },
    };

    renderComponent(contextValue);

    const button = screen.getByTestId('upgrade-all-button');

    expect(button).toHaveTextContent(messages.upgradeAllRemainingCoursesButtonText.defaultMessage);

    expect(button).toHaveAttribute('href', mockBuyButtonUrl);

    expect(screen.getByText(`$${mockListPrice.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockDiscountedPrice.toFixed(2)}`)).toBeInTheDocument();
  });
});
