import { authenticatedLoader, homeRole, getAuthenticatedHttpClient } from '@openedx/frontend-base';
import { redirect } from 'react-router-dom';

import { dashboardRole } from './constants';
import { getSubsInitApiUrl } from './data/services/lms/urls';

// loader to check if the user has subscription access
const subscriptionAccessLoader = async () => {
  try {
    const { data } = await getAuthenticatedHttpClient().get(getSubsInitApiUrl());
    
    if (data.userSubscription && data.userSubscription.isSubscriber) {
      throw redirect('/subscription-learner-dashboard');  //redirect to subscription learner dashboard if user have subscription access
    }
  
    return null;
  } catch (error) {
    // Let redirect responses bubble up
    if (error instanceof Response) {
      throw error;
    }

    throw redirect('/learner-dashboard');  //keep the user on learner dashboard if an error occurs
  }
};

// composed loader that checks for authentication and subscription access
const protectedLoader = async (args) => {
  await authenticatedLoader(args);
  await subscriptionAccessLoader();

  return null;
};

const routes = [
  {
    id: 'org.openedx.frontend.route.learnerDashboard.main',
    path: '/learner-dashboard',
    loader: protectedLoader,
    handle: {
      roles: [dashboardRole, homeRole]
    },
    async lazy () {
      const module = await import(/* webpackChunkName: "learner-dashboard-main" */ './Main');
      return { Component: module.default };
    },
  }
];

export default routes;
