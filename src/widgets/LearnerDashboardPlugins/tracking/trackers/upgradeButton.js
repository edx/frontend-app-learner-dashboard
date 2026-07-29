import { logError } from '@openedx/frontend-base';
import { logEvent, createEventTracker, createLinkTracker } from '../utils';
import { handleCorrelationIDCookie } from '../cookie';
import { eventNames, categories } from '../constants';

const upsellOptions = {
  linkName: 'course_dashboard_green',
  linkCategory: 'green_update',
};

const logUpgrade = ({ courseId }) => logEvent({
  eventName: eventNames.upgradeButtonClickedEnrollment,
  courseId,
  data: { location: 'learner-dashboard' },
});

// Upgrade Events
/**
 * There are currently multiple tracked api events for the upgrade event, with different targets.
 * Goal here is to split out the tracked events for easier testing.
 */
const upgradeButtonClicked = (courseId) => createEventTracker(
  eventNames.upgradeButtonClicked,
  { category: categories.upgrade, label: courseId },
);

const upgradeButtonClickedUpsell = (courseId) => createEventTracker(
  eventNames.upgradeButtonClickedUpsell,
  { ...upsellOptions, courseId },
);

const upgradeButtonClickedCohesion = (org, courseName) => {
  const correlationId = handleCorrelationIDCookie();
  const courseOrganization = org.toLowerCase();

  if (window.tagular && typeof window.tagular === 'function') {
    window.tagular?.('beam', {
      '@type': 'core.conversions.ConversionTracked.v2',
      correlation: {
        id: correlationId,
      },
      metadata: {
        category: 'Enrollment',
        action: 'Upgraded',
        timestamp: new Date().toISOString(),
        productList: [{
          brand: courseOrganization,
          variant: 'courses',
          name: courseName,
        }],
      },
    });
  } else {
    logError('Cohesion script failed to load before upgrade button clicked');
  }
};

export const upgradeClicked = (courseId, org, courseName, href) => createLinkTracker(
  () => {
    upgradeButtonClicked(courseId)();
    upgradeButtonClickedUpsell(courseId)();
    upgradeButtonClickedCohesion(org, courseName);
    logUpgrade({ courseId });
  },
  href,
);
