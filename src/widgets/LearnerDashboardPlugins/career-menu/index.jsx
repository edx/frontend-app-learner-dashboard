import { getAppConfig, useIntl } from '@openedx/frontend-base';
import {
  Badge, breakpoints, Dropdown, useWindowSize,
} from '@openedx/paragon';

import _ from 'lodash';

import { useInitializeLearnerHome } from '@src/data/hooks';
import messages from './messages';

const UserCareerMenu = () => {
  const { formatMessage } = useIntl();
  const { width } = useWindowSize();
  const { data } = useInitializeLearnerHome();
  const dashboard = data?.enterpriseDashboard || {};
  const isMobile = width <= breakpoints.small.maxWidth;

  if (_.isEmpty(dashboard) && getAppConfig().CAREER_LINK_URL) {
    if (!isMobile) {
      return (
        <Dropdown.Item href={`${getAppConfig().CAREER_LINK_URL}`} key="item-career">
          {formatMessage(messages.career)}
          <Badge className="px-2 mx-2" variant="warning">
            {formatMessage(messages.newAlert)}
          </Badge>
        </Dropdown.Item>
      );
    }

    return (
      <li className="nav-item" key="item-career">
        <a href={`${getAppConfig().CAREER_LINK_URL}`} className="nav-link">
          {formatMessage(messages.career)}
          <Badge className="px-2 mx-2" variant="warning">
            {formatMessage(messages.newAlert)}
          </Badge>
        </a>
      </li>
    );
  }
  return null;
};

export default UserCareerMenu;
