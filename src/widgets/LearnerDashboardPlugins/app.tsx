import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import UpgradeButton from './upgrade-button/UpgradeButton';

const config = {
  pluginSlots: {
    'org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: UpgradeButton,
          },
        },
      ],
    },
  },
};

export default config;
