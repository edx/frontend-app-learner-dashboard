import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  enterpriseDialogHeader: {
    id: 'leanerDashboard.enterpriseDialogHeader',
    defaultMessage: 'Start exploring the free courses available to you through the {label} dashboard.',
    description: 'title for enterprise dashboard dialog',
  },
  enterpriseDialogBody: {
    id: 'leanerDashboard.enterpriseDialogBody',
    defaultMessage: 'You have access to a range of free courses. To explore and start learning, simply click "Go to dashboard" now.',
    description: 'Body text for enterprise dashboard dialog',
  },
  enterpriseDialogDismissButton: {
    id: 'leanerDashboard.enterpriseDialogDismissButton',
    defaultMessage: 'Dismiss',
    description: 'Dismiss button to cancel visiting dashboard',
  },
  enterpriseDialogConfirmButton: {
    id: 'leanerDashboard.enterpriseDialogConfirmButton',
    defaultMessage: 'Go to dashboard',
    description: 'Confirm button to go to the dashboard url',
  },
});

export default messages;
