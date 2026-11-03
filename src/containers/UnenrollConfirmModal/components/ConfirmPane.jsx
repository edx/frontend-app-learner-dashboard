import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  Button,
  MailtoLink,
} from '@openedx/paragon';

import messages from './messages';

export const ConfirmPane = ({
  cardId,
  handleClose,
  handleConfirm,
}) => {
  const { formatMessage } = useIntl();
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const { refundPolicyChangeEnabled, supportEmail } = reduxHooks.usePlatformSettingsData();
  const courseTitle = <span className="font-italic">“{courseName}”</span>;
  const supportLink = <MailtoLink to={supportEmail}>{supportEmail}</MailtoLink>;
  return (
    <>
      <h4>{formatMessage(messages.confirmHeader)}</h4>
      <p className="py-2">{formatMessage(messages.confirmText, { courseTitle })}</p>
      {refundPolicyChangeEnabled && (
        <p className="pb-2" data-testid="refund-policy-notice">
          {formatMessage(messages.refundNotice, { supportEmail: supportLink })}
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
