import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { reduxHooks } from 'hooks';
import NoCoursesView from 'containers/CoursesPanel/NoCoursesView';

export const NoCoursesViewSlot = () => {
  const rvPlugins = reduxHooks.useRvPluginsData();

  if (!rvPlugins || rvPlugins.isEnabled) {
    return null;
  }

  return (
    <PluginSlot
      id="org.openedx.frontend.learner_dashboard.no_courses_view\.v1"
      idAliases={['no_courses_view_slot']}
    >
      <NoCoursesView />
    </PluginSlot>
  );
};

export default NoCoursesViewSlot;
