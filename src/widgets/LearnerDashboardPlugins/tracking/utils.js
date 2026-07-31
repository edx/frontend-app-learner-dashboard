import {
  getSiteConfig, getAuthenticatedHttpClient, sendTrackEvent, sendPageEvent,
} from '@openedx/frontend-base';
import { LEARNER_HOME_APP_NAME } from './constants';

const LINK_TIMEOUT = 300;

const eventUrl = `${getSiteConfig().LMS_BASE_URL}/event`;

// Utils/Helpers
export const logEvent = ({ eventName, data, courseId }) => getAuthenticatedHttpClient().post(eventUrl, {
  courserun_key: courseId,
  event_type: eventName,
  page: window.location.href,
  event: JSON.stringify(data),
});

export const createEventTracker = (name, options = {}) => () => sendTrackEvent(
  name,
  { ...options, app_name: LEARNER_HOME_APP_NAME },
);

/**
 * Creates an event tracker function that sends a tracking event with the given name and options.
 *
 * @param {string} name - The name of the event to be tracked.
 * @param {object} [options={}] - Additional options to be included with the event.
 * @returns {function} - A function that, when called, sends the tracking event.
 */
export const createPageEventTracker = (name, options = null) => () => sendPageEvent(
  name,
  options,
  { app_name: LEARNER_HOME_APP_NAME },
);

export const createLinkTracker = (tracker, href) => (e) => {
  e.preventDefault();
  tracker();
  return setTimeout(() => {
    global.location.href = href;
  }, LINK_TIMEOUT);
};
