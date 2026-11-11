import { getSiteConfig } from '@openedx/frontend-base';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@openedx/frontend-base';
import { logError, logInfo } from '@openedx/frontend-base';

export const noticesUrl = `${getSiteConfig().lmsBaseUrl}/notices/api/v1/unacknowledged`;

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
