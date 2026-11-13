import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
} from '@openedx/paragon';

import ContactUsLink from 'components/ContactUsLink';

import messages from './messages';

export const ConfirmPane = ({
  cardId,
  handleClose,
  handleConfirm,
}) => {
  const { formatMessage } = useIntl();
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  // True only when this course's order follows the new policy: unenrolling will not refund it automatically.
  const { refundPolicyChangeApplies } = reduxHooks.useCardEnrollmentData(cardId);
  const courseTitle = <span className="font-italic">“{courseName}”</span>;
  return (
    <>
      <h4>{formatMessage(messages.confirmHeader)}</h4>
      <p className="py-2">{formatMessage(messages.confirmText, { courseTitle })}</p>
      {refundPolicyChangeApplies && (
        <p className="pb-2" data-testid="refund-policy-notice">
          {formatMessage(messages.refundNotice, { contactUsLink: <ContactUsLink /> })}
        </p>
      )}
      <ActionRow>
        <Button variant="tertiary" onClick={handleClose}>
          {formatMessage(messages.confirmCancel)}
        </Button>
        <Button onClick={handleConfirm}>
          {formatMessage(messages.confirmUnenroll)}
        </Button>
      </ActionRow>
    </>
  );
};
ConfirmPane.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default ConfirmPane;
