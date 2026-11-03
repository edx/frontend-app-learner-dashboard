import { getAppConfig } from '@openedx/frontend-base';
import { getAuthenticatedHttpClient } from '@openedx/frontend-base';

export default async function getThirdPartyAuthContext(urlParams) {
  const requestConfig = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: urlParams,
    isPublic: true,
  };

  const { data } = await getAuthenticatedHttpClient()
    .get(
      `${getAppConfig().LMS_BASE_URL}/api/mfe_context`,
      requestConfig,
    )
    .catch((e) => {
      throw (e);
    });
  return {
    fieldDescriptions: data.registrationFields || {},
    optionalFields: data.optionalFields || {},
    thirdPartyAuthContext: data.contextData || {},
  };
}
