import React from 'react';
import { useInitializeLearnerHome } from '@src/data/hooks';
import { EnterpriseDashboardModal } from './EnterpriseDashboardModal';

const EnterpriseDashboardModalWrapper = () => {
  const { data } = useInitializeLearnerHome();
  const hasAvailableDashboards = typeof data?.hasAvailableDashboards === 'boolean'
    ? data.hasAvailableDashboards
    : data?.enterpriseDashboard?.isLearnerPortalEnabled === true;

  if (hasAvailableDashboards) {
    return <EnterpriseDashboardModal />;
  }
  return null;
};

export default EnterpriseDashboardModalWrapper;
