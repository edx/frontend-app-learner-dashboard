import React, { useContext } from 'react';
import { Button } from '@openedx/paragon';
import { FormattedNumber, useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import './index.scss';
import { ProgramProgressContext, ProgramProgressContextValueType } from '../ProgramProgressProvider.tsx';

// TODO: review and write tests for this

const UpgradeAllButton: React.FC = () => {
  const { formatMessage } = useIntl();
  const { programProgressData } = useContext<ProgramProgressContextValueType>(ProgramProgressContext);
  const { urls } = programProgressData;

  const getAllRemainingCoursesPrice = () => {
    const { discountData } = programProgressData.programData;

    if (discountData) {
      const {
        currency,
        isDiscounted,
        totalInclTaxExclDiscounts,
        totalInclTax,
      } = discountData;

      if (isDiscounted) {
        return (
          <>
            <span className="list-price">
              <FormattedNumber
                value={totalInclTaxExclDiscounts}
                style="currency" // eslint-disable-line react/style-prop-object
                currency={currency}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            </span>
            <span>
              <FormattedNumber
                value={totalInclTax}
                style="currency" // eslint-disable-line react/style-prop-object
                currency={currency}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            </span>
          </>
        );
      }
      return (
        <span>
          <FormattedNumber
            value={totalInclTax}
            style="currency" // eslint-disable-line react/style-prop-object
            currency={currency}
            maximumFractionDigits={2}
            minimumFractionDigits={2}
          />
        </span>
      );
    }
    return null;
  };

  return (
    <Button
      as="a"
      className="upgrade-all-button"
      href={urls && urls.buyButtonUrl}
      data-testid="upgrade-all-button"
    >
      <span>
        {formatMessage(messages.upgradeAllRemainingCoursesButtonText)}
      </span>
      ( {getAllRemainingCoursesPrice()} )
    </Button>
  );
};

export default UpgradeAllButton;
