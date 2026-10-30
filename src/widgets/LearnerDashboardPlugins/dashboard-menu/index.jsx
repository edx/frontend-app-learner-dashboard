import { getAppConfig } from '@openedx/frontend-base';
import { useIntl } from '@openedx/frontend-base';
import {
  breakpoints, Dropdown, useWindowSize,
} from '@openedx/paragon';
import _ from 'lodash';
import { useInitializeLearnerHome } from '@src/data/hooks';

import messages from './messages';

const UserDashboardMenu = () => {
  const { formatMessage } = useIntl();
  const { width } = useWindowSize();
  const { data } = useInitializeLearnerHome();
  const dashboard = data?.enterpriseDashboard || {};
  const isMobile = width <= breakpoints.small.maxWidth;

  if (getAppConfig().ENABLE_EDX_PERSONAL_DASHBOARD) {
    if (!isMobile) {
      return (
        <>
          <Dropdown.Header>{formatMessage(messages.dashboardSwitch)}</Dropdown.Header>
          <Dropdown.Item as="a" href="/edx-dashboard" className="active" key="item-dashboard">
            {formatMessage(messages.dashboardPersonal)}
          </Dropdown.Item>
          {!_.isEmpty(dashboard) && (
          <Dropdown.Item as="a" href={dashboard.url} key={dashboard.label}>
            {dashboard.label} {formatMessage(messages.dashboard)}
          </Dropdown.Item>
          )}
          <Dropdown.Divider />
        </>
      );
    }
    return (
      <>
        <li className="nav-item" key="item-dashboard">
          <a href="/edx-dashboard" className="nav-link active">
            {formatMessage(messages.dashboardPersonal)}
          </a>
        </li>
        {!_.isEmpty(dashboard) && (
        <li className="nav-item" key={dashboard.label}>
          <a href={dashboard.url} className="nav-link active">
            {dashboard.label} {formatMessage(messages.dashboard)}
          </a>
        </li>
        )}
      </>
    );
  }
  return null;
};

export default UserDashboardMenu;
