import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

export async function getProgramsListData() {
  const url = `${getConfig().LMS_BASE_URL}/api/dashboard/v0/programs/`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response;
}

export async function getProgramProgressData(uuid: string) {
  const url = `${getConfig().LMS_BASE_URL}/api/dashboard/v0/programs/${uuid}/progress_details/`;
  const response = await getAuthenticatedHttpClient().get(url);
  return response;
}
