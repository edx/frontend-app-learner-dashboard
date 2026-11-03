import { renderHook } from '@testing-library/react';

import { useInitializeLearnerHome } from '@src/data/hooks';
import { modalCTAClicked } from '../../tracking/trackers/enterpriseDashboardModal';
import * as hooks from './hooks';
import { MockUseState } from '@src/testUtils';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}), { virtual: true });

jest.mock('../../tracking/trackers/enterpriseDashboardModal', () => {
  const modalOpenedEvent = jest.fn();
  const modalClosedEvent = jest.fn();
  const modalCTAClickedEvent = jest.fn();
  return {
    __esModule: true,
    modalOpenedEvent,
    modalClosedEvent,
    modalCTAClickedEvent,
    modalOpened: jest.fn(() => modalOpenedEvent),
    modalClosed: jest.fn(() => modalClosedEvent),
    modalCTAClicked: jest.fn(() => modalCTAClickedEvent),
  };
});

const state = new MockUseState(hooks);

const enterpriseDashboardData = { label: 'edX, Inc.', url: '/edx-dashboard' };

describe('EnterpriseDashboardModal hooks', () => {
  useInitializeLearnerHome.mockReturnValue({
    data: { enterpriseDashboard: { ...enterpriseDashboardData }, hasAvailableDashboards: true },
  });

  describe('state values', () => {
    state.testGetter(state.keys.showModal);
  });

  describe('behavior', () => {
    let out;

    beforeEach(() => {
      state.mock();
      renderHook(() => {
        out = hooks.useEnterpriseDashboardModal();
      });
    });
    afterEach(state.restore);

    test('useEnterpriseDashboardModal to return dashboard data from redux hooks', () => {
      expect(out.dashboard).toMatchObject(enterpriseDashboardData);
    });

    test('modal initializes to shown when rendered and closes on click', () => {
      state.expectInitializedWith(state.keys.showModal, true);
      out.handleClose();
      expect(state.values.showModal).toEqual(false);
    });

    test('CTA click tracks modalCTAClicked', () => {
      out.handleCTAClick();
      expect(modalCTAClicked).toHaveBeenCalledWith(
        enterpriseDashboardData.enterpriseUUID,
        enterpriseDashboardData.url,
      );
    });
  });
});
