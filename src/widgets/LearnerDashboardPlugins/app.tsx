import { PLUGIN_OPERATIONS, DIRECT_PLUGIN } from '@openedx/frontend-plugin-framework';

import { 
  CohesionWrapper,
  CourseBanner,
  EnterpriseDashboardModal,
  HelpChatbot,
  NoCoursesView,
  NoticesRedirect,
  UclWrapper,
  UserCareerMenu,
  UserDashboardMenu,
  UpgradeButton,
} from '@edx/frontend-plugin-learner-dashboard';

const config = {
  pluginSlots: {
    'org.openedx.frontend.learner_dashboard.no_courses_view.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'org.openedx.frontend.learner_dashboard.no_courses_view.v1',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: NoCoursesView,
          },
        },
      ],
    },
    header_user_menu_group_item_slot: {
      plugins: [
        {
          // Insert career button in header menu dropdown
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'career_menu_item',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: UserCareerMenu,
          },
        },
      ],
    },
    header_user_menu_group_slot: {
      plugins: [
        {
          // insert personal and enterprise dashboard buttons in header menu dropdown
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'dashboard_user_menu_group',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: UserDashboardMenu,
          },
        },
      ],
    },
    'org.openedx.frontend.learner_dashboard.course_card_action.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'org.openedx.frontend.learner_dashboard.course_card_action.v1',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: UpgradeButton,
          },
        },
      ],
    },
    'org.openedx.frontend.learner_dashboard.dashboard_modal.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'org.openedx.frontend.learner_dashboard.dashboard_modal.v1',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: EnterpriseDashboardModal,
          },
        }
      ]
    },
    'org.openedx.frontend.learner_dashboard.course_card_banner.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'org.openedx.frontend.learner_dashboard.course_card_banner.v1',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: CourseBanner,
          },
        },
      ],
    },
    'org.openedx.frontend.layout.footer.v1': {
      keepDefault: true,
      plugins: [
        {
          // insert the Xpert Frontend Chatbot
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'xpert_chatbot_plugin',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: HelpChatbot,
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'cohesion_plugin',
            type: DIRECT_PLUGIN,
            priority: 70,
            RenderWidget: CohesionWrapper,
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'notices_redirect',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: NoticesRedirect,
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'ucl_plugin',
            type: DIRECT_PLUGIN,
            priority: 80,
            RenderWidget: UclWrapper,
          },
        },
      ],
    },
  },
};

export default config;
