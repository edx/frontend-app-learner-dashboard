import { App, WidgetOperationTypes } from '@openedx/frontend-base';

import UpgradeButton from './upgrade-button/UpgradeButton';
import UclWrapper from './ucl-wrapper/index';
import ProgressiveProfilingEntry from './progressive-profiling-dashboard/ProgressiveProfilingModal';
// import OptimizelyExperiment from './optimizely';
// import useNoticesRedirectData from './notices-redirect';
// import NoCoursesView from './no-courses-view';
// import DynamicExperienceSlot from './dynamic-experience-slot';
// import EnterpriseDashboardModalWrapper from './dashboard-modal';
// import UserDashboardMenu from './dashboard-menu';
// import CourseBanner from './course-banner';
// import CohesionWrapper from './cohesion-wrapper';
// import HelpChatbot from './chatbot';
// import UserCareerMenu from './career-menu';

const app: App = {
  appId: 'org.openedx.frontend.app.learnerDashboard.plugins',
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.upgradeButton.v1',
      op: WidgetOperationTypes.PREPEND,
      component: UpgradeButton,
    },
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.uclWrapper.v1',
      op: WidgetOperationTypes.PREPEND,
      component: UclWrapper,
    },
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.progressiveProfilingEntry.v1',
      op: WidgetOperationTypes.PREPEND,
      component: ProgressiveProfilingEntry,
    },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.noCoursesView.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.noCoursesView.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: NoCoursesView,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.dynamicExperienceSlot.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.dynamicExperienceSlot.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: DynamicExperienceSlot,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.enterpriseDashboardModal.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.enterpriseDashboardModal.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: EnterpriseDashboardModalWrapper,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.userDashboardMenu.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.userDashboardMenu.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: UserDashboardMenu,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.courseBanner.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.courseBanner.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: CourseBanner,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.cohesionWrapper.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.cohesionWrapper.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: CohesionWrapper,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.chatbot.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.chatbot.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: HelpChatbot,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.careerMenu.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.careerMenu.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: UserCareerMenu,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.optimizelyExperiment.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.optimizelyExperiment.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: OptimizelyExperiment,
  //   },
  //   {
  //     slotId: 'org.openedx.frontend.slot.learnerDashboard.optimizelyExperiment.v1',
  //     id: 'org.openedx.frontend.widget.learnerDashboard.optimizelyExperiment.v1',
  //     op: WidgetOperationTypes.PREPEND,
  //     component: useNoticesRedirectData,
  //   },
  ],
};

export default app;
