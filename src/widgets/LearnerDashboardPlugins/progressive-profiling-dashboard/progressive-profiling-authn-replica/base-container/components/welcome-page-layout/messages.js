import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  'welcome.to.platform': {
    id: 'welcome.to.platform',
    defaultMessage: 'Welcome to {siteName}, {fullName}!',
    description: 'Welcome message that appears on progressive profile page',
  },
  'start.learning': {
    id: 'start.learning',
    defaultMessage: 'Start learning',
    description: 'Header text for logistration MFE pages',
  },
  'with.site.name': {
    id: 'with.site.name',
    defaultMessage: 'with {siteName}',
    description: 'Header text with site name for logistration MFE pages',
  },
  'with.edx': {
    id: 'with.edx',
    defaultMessage: ' with edX',
    description: 'Text used to append the edX brand in the welcome message',
  },
  'complete.your.profile.1': {
    id: 'complete.your.profile.1',
    defaultMessage: 'Complete',
    description: 'part of text "complete your profile"',
  },
  'complete.your.profile.2': {
    id: 'complete.your.profile.2',
    defaultMessage: 'your profile',
    description: 'part of text "complete your profile"',
  },
});

export default messages;
