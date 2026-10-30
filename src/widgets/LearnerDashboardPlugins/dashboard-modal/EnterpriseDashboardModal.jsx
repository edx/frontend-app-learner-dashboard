import React from 'react';
import { useIntl } from '@openedx/frontend-base';
import { ActionRow, AlertModal, Button } from '@openedx/paragon';

import messages from './messages';
import { useEnterpriseDashboardModal } from './hooks/hooks';

export const EnterpriseDashboardModal = () => {
  const { formatMessage } = useIntl();
  const {
    showModal, handleClose, handleCTAClick, dashboard,
  } = useEnterpriseDashboardModal();
  if (!dashboard?.label) {
    return null;
  }
  return (
    <AlertModal
      title={formatMessage(messages.enterpriseDialogHeader, {
        label: dashboard.label,
      })}
      isBlocking
      isOpen={showModal}
      hasCloseButton={false}
      footerNode={(
        <ActionRow>
          <Button variant="tertiary" onClick={handleClose}>
            {formatMessage(messages.enterpriseDialogDismissButton)}
          </Button>
          <Button href={dashboard.url} onClick={handleCTAClick}>
            {formatMessage(messages.enterpriseDialogConfirmButton)}
          </Button>
        </ActionRow>
      )}
    >
      {formatMessage(messages.enterpriseDialogBody, {
        label: dashboard.label,
      })}
    </AlertModal>
  );
};

export default EnterpriseDashboardModal;
