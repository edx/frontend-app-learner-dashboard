export const LEARNER_HOME_APP_NAME = 'learner-home';

const learnerPortal = 'edx.ui.enterprise.lms.dashboard.learner_portal_modal';

export const eventNames = {
  dashboardModalOpened: `${learnerPortal}.opened`,
  dashboardModalCTAClicked: `${learnerPortal}.dashboard_cta.clicked`,
  dashboardModalClosed: `${learnerPortal}.closed`,
  upgradeButtonClicked: 'edx.bi.dashboard.upgrade_button.clicked',
  upgradeButtonClickedEnrollment: 'edx.course.enrollment.upgrade.clicked',
  upgradeButtonClickedUpsell: 'edx.bi.ecommerce.upsell_links_clicked',
};

export const categories = {
  upgrade: 'upgrade',
};

// Cohesion event properties
export const BUTTON_ELEMENT_TYPE = 'BUTTON';
export const LOCATION_LEARNER_HOME = 'learner-home-legacy';
export const EXPLORE_COURSES_HTML_ID = 'explore-courses';
export const EXPLORE_COURSES_EVENT_NAME = 'explore-courses-LD-cta';
export const EXPLORE_COURSES_EVENT_TEXT = 'Explore courses';
