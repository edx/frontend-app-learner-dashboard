import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { reduxHooks } from 'hooks';
import LookingForChallengeWidget from 'plugins/LookingForChallengeWidget';

// eslint-disable-next-line arrow-body-style
export const WidgetSidebarSlot = () => {
  const rvPlugins = reduxHooks.useRvPluginsData();

  if (rvPlugins?.isEnabled) {
    return null;
  }

  return (
    <PluginSlot
      id="org.openedx.frontend.learner_dashboard.widget_sidebar.v1"
      idAliases={['widget_sidebar_slot']}
    >
      <LookingForChallengeWidget />
    </PluginSlot>
  );
};

export default WidgetSidebarSlot;
