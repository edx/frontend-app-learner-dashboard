/* eslint-disable quotes */
import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  confirmHeader: {
    id: 'learner-dash.unenrollConfirm.confirm.header',
    description: 'Header for confirm unenroll modal',
    defaultMessage: 'Confirm Unenrollment',
  },
  confirmText: {
    id: 'learner-dash.unenrollConfirm.confirm.text',
    description: 'Text for confirm unenroll modal',
    defaultMessage: 'Are you sure you want to unenroll from the course {courseTitle} ?',
  },
  // TODO: Placeholder copy until Legal/Compliance provides the approved refund policy wording (LP-1395).
  // To swap in the final wording, change defaultMessage only; {contactUsLink} renders the Contact Us form link.
  refundNotice: {
    id: 'learner-dash.unenrollConfirm.confirm.refundNotice',
    description: 'Notice in the confirm unenroll modal explaining that refunds are no longer automatic',
    defaultMessage: 'Unenrolling does not automatically issue a refund. To request one, use our {contactUsLink} within 7 days of your purchase.',
  },
  confirmCancel: {
    id: 'learner-dash.unenrollConfirm.confirm.cancel',
    description: 'Cancel action for confirm unenroll modal',
    defaultMessage: 'Cancel',
  },
  confirmUnenroll: {
    id: 'learner-dash.unenrollConfirm.confirm.unenroll',
    description: 'Confirm action for confirm unenroll modal',
    defaultMessage: 'Unenroll',
  },
  reasonHeading: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.heading',
    description: 'Heading for unenroll reason modal',
    defaultMessage: 'Why are you unenrolling?',
  },
  reasonSkip: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.skip',
    description: 'Skip action for unenroll reason modal',
    defaultMessage: 'Skip survey',
  },
  reasonSubmit: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.submit',
    description: 'Submit action for unenroll reason modal',
    defaultMessage: 'Unenroll',
  },
  finishHeading: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.heading',
    description: 'Heading for unenroll finish modal',
    defaultMessage: 'Unenrollment Successful',
  },
  finishText: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.text',
    description: 'Text for unenroll finish modal',
    defaultMessage: 'You have been unenrolled from the course {courseTitle}',
  },
  finishReturn: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.return',
    description: 'Return action for unenroll finish modal',
    defaultMessage: 'Ok',
  },
});

export default messages;
