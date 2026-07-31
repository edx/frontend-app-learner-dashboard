import { App, WidgetOperationTypes } from '@openedx/frontend-base';

import UpgradeButton from './upgrade-button/UpgradeButton';

const app: App = {
  appId: 'org.openedx.frontend.app.learnerDashboard.plugins',
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.upgradeButton.v1',
      op: WidgetOperationTypes.PREPEND,
      component: UpgradeButton,
    },
  ],
};

export default app;
