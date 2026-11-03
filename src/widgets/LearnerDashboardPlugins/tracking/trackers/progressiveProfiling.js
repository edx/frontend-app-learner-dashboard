import { createEventTracker, createPageEventTracker } from '../utils';

export const eventNames = {
  progressiveProfilingSubmitClick: 'edx.bi.welcome.page.submit.clicked',
  progressiveProfilingSkipLinkClick: 'edx.bi.welcome.page.skip.link.clicked',
  disablePostRegistrationRecommendations: 'edx.bi.user.recommendations.not.enabled',
  progressiveProfilingSupportLinkClick: 'edx.bi.welcome.page.support.link.clicked',
  loginAndRegistration: 'login_and_registration',
  progressiveProfilingQuestionaireModalFormOpened: 'edx.bi.welcome.page.questionaire.modal.opened',
};

// Event link tracker for Progressive profiling skip button click
export const trackProgressiveProfilingSkipLinkClick = evenProperties => createEventTracker(
  eventNames.progressiveProfilingSkipLinkClick, { ...evenProperties },
)();

// Event tracker for progressive profiling submit button click
export const trackProgressiveProfilingSubmitClick = (evenProperties) => createEventTracker(
  eventNames.progressiveProfilingSubmitClick,
  { ...evenProperties },
)();

// Event tracker for progressive profiling submit button click
export const trackDisablePostRegistrationRecommendations = (evenProperties) => createEventTracker(
  eventNames.disablePostRegistrationRecommendations,
  { ...evenProperties },
)();

// Tracks the progressive profiling page event.
export const trackProgressiveProfilingPageViewed = () => {
  createPageEventTracker(eventNames.loginAndRegistration, 'welcome')();
};

// Tracks the progressive profiling support link click.
export const trackProgressiveProfilingSupportLinkClick = () => createEventTracker(
  eventNames.progressiveProfilingSupportLinkClick,
  {},
)();

// Tracks the progressive profiling modal opened with the questionaire form.
export const trackProgressiveProfilingQuestionaireModalFormOpened = (evenProperties) => createEventTracker(
  eventNames.progressiveProfilingQuestionaireModalFormOpened,
  { ...evenProperties },
)();
