import { createEventTracker } from '../utils';
import { modalClosed, modalCTAClicked, modalOpened } from './enterpriseDashboardModal';

const learnerPortal = 'edx.ui.enterprise.lms.dashboard.learner_portal_modal';

const eventNames = {
  dashboardModalOpened: `${learnerPortal}.opened`,
  dashboardModalCTAClicked: `${learnerPortal}.dashboard_cta.clicked`,
  dashboardModalClosed: `${learnerPortal}.closed`,
};

jest.mock('../utils', () => ({
  createEventTracker: jest.fn(args => ({ createEventTracker: args })),
  createLinkTracker: jest.fn((cb, href) => ({ createLinkTracker: { cb, href } })),
}));

const enterpriseUUID = 'test-enterprise-uuid';
const source = 'test-source';

describe('dashboardModal trackers', () => {
  describe('modalOpened', () => {
    it('creates event tracker for dashboard modal opened event', () => {
      expect(modalOpened(enterpriseUUID, source)()).toEqual(
        createEventTracker(
          eventNames.dashboardModalOpened,
          { enterpriseUUID, source },
        ),
      );
    });
  });
  describe('modalCTAClicked', () => {
    const testHref = 'test-href';
    it('creates link tracker for dashboard modal cta click event', () => {
      const { cb, href } = modalCTAClicked(enterpriseUUID, testHref).createLinkTracker;
      expect(href).toEqual(testHref);
      expect(cb).toEqual(
        createEventTracker(
          eventNames.dashboardModalCTAClicked,
          { enterpriseUUID, source },
        ),
      );
    });
  });
  describe('modalClosed', () => {
    it('creates event tracker for dashboard modal closed event with close source', () => {
      expect(modalClosed(enterpriseUUID, source)).toEqual(
        createEventTracker(
          eventNames.dashboardModalClosed,
          { enterpriseUUID, source },
        ),
      );
    });
  });
});
