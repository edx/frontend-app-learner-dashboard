import React from 'react';
import { useInitializeLearnerHome } from '@src/data/hooks';
import { modalOpened, modalCTAClicked, modalClosed } from '../../tracking/trackers/enterpriseDashboardModal';

export const state = {
  showModal: (val) => React.useState(val), // eslint-disable-line
};

export const useEnterpriseDashboardModal = () => {
  const { data } = useInitializeLearnerHome();
  const hasAvailableDashboards = typeof data?.hasAvailableDashboards === 'boolean'
    ? data.hasAvailableDashboards
    : data?.enterpriseDashboard?.isLearnerPortalEnabled === true;
  const [showModal, setShowModal] = state.showModal(hasAvailableDashboards);
  const dashboard = data?.enterpriseDashboard || {};

  const trackOpened = modalOpened(dashboard.enterpriseUUID);
  const trackClose = modalClosed(dashboard.enterpriseUUID, 'Cancel button');

  const handleCTAClick = modalCTAClicked(dashboard.enterpriseUUID, dashboard.url);
  const handleClose = () => {
    trackClose();
    setShowModal(false);
  };

  React.useEffect(() => {
    if (dashboard?.label) {
      trackOpened();
    }
  }, []); // eslint-disable-line

  return {
    showModal,
    handleCTAClick,
    handleClose,
    dashboard,
  };
};
