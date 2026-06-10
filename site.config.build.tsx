// @ts-nocheck
import { EnvironmentTypes, SiteConfig, footerApp, headerApp, shellApp } from '@openedx/frontend-base';
import { learnerDashboardApp } from '@openedx/frontend-app-learner-dashboard';
import { notificationsApp } from '@openedx/frontend-app-notifications';

import '@openedx/frontend-base/shell/style';
import '@openedx/brand-openedx/dist/core.min.css';
import '@openedx/brand-openedx/dist/light.min.css';

const siteConfig: SiteConfig = {
  siteId: 'frontend-site-learner-home-stage',
  siteName: 'Learner Home Site Stage',
  baseUrl: 'http://localhost:1996',
  lmsBaseUrl: 'http://localhost:18000',
  loginUrl: 'http://localhost:18000/login',
  logoutUrl: 'http://localhost:18000/logout',

  environment: EnvironmentTypes.DEVELOPMENT,
  apps: [
    shellApp,
    headerApp,
    footerApp,
    notificationsApp,
    learnerDashboardApp,
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
