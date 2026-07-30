import { SlotOperation } from '@openedx/frontend-base';

import { learnerDashboardHeaderApp } from './widgets/LearnerDashboardHeader';
import { learnerDashboardPlugins } from './widgets/LearnerDashboardPlugins';

const slots: SlotOperation[] = [
  ...(learnerDashboardHeaderApp.slots as []),
  ...(learnerDashboardPlugins.slots as []),
];

export default slots;
