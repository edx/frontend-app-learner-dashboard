import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { ErrorBoundary } from '@edx/frontend-platform/react';
import { UpgradeButton, DynamicExperienceSlot } from '@edx/frontend-plugin-learner-dashboard';

const CourseCardActionSlot = ({ cardId }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_card_action.v1"
    idAliases={['course_card_action_slot']}
    pluginProps={{
      cardId,
    }}
  >
    <ErrorBoundary fallbackComponent={<UpgradeButton cardId={cardId} />}>
      <DynamicExperienceSlot
        widgetName="MonarchResolvedDynamicExperience"
        placement="org.openedx.frontend.learner_dashboard.course_card_action.v1"
        tenantId="2u-edx-learner-dashboard"
      />
    </ErrorBoundary>
  </PluginSlot>
);

CourseCardActionSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActionSlot;
