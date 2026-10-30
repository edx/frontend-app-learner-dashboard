import { getAppConfig } from '@openedx/frontend-base';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@openedx/frontend-base';
import { logError, logInfo } from '@openedx/frontend-base';

export const noticesUrl = `${getAppConfig().LMS_BASE_URL}/notices/api/v1/unacknowledged`;

export const getNotices = ({ onLoad, notFoundMessage }) => {
  const authenticatedUser = getAuthenticatedUser();

  const handleError = async (e) => {
    // Error probably means that notices is not installed, which is fine.
    const { customAttributes: { httpErrorStatus } } = e;
    if (httpErrorStatus === 404) {
      logInfo(`${e}. ${notFoundMessage}`);
    } else {
      logError(e);
    }
  };
  if (authenticatedUser) {
    return getAuthenticatedHttpClient().get(noticesUrl, {}).then(onLoad).catch(handleError);
  }
  return null;
};

export default { getNotices };
