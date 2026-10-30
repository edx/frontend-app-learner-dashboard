import { getAppConfig, snakeCaseObject } from '@openedx/frontend-base';
import { getAuthenticatedUser, getAuthenticatedHttpClient } from '@openedx/frontend-base';

export async function saveProgressiveProfiling(values, extendedProfileFieldNames = []) {
  const payload = { ...values };
  const extendedProfile = [];
  const authenticatedUser = getAuthenticatedUser();
  const client = getAuthenticatedHttpClient();

  extendedProfileFieldNames.forEach((fieldName) => {
    if (payload[fieldName] !== undefined && payload[fieldName] !== '') {
      extendedProfile.push({
        fieldName,
        fieldValue: payload[fieldName],
      });
    }

    delete payload[fieldName];
  });

  if (extendedProfile.length) {
    payload.extendedProfile = extendedProfile;
  }

  await client.patch(
    `${getAppConfig().LMS_BASE_URL}/api/user/v1/accounts/${authenticatedUser.username}`,
    snakeCaseObject(payload),
    {
      headers: { 'Content-Type': 'application/merge-patch+json' },
    },
  );
}
