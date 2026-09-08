/**
 * Builds the exec-ed CTA tracking query string, appending org_id (required) and
 * course_id (only when courseUuid is available).
 * @param {string} authOrgId
 * @param {string} [courseUuid]
 * @returns {string} query string, e.g. '?org_id=foo&course_id=bar'
 */
export const buildTrackingQuery = (authOrgId, courseUuid) => {
  const params = new URLSearchParams({ org_id: authOrgId });
  if (courseUuid) { params.set('course_id', courseUuid); }
  return `?${params.toString()}`;
};

export default { buildTrackingQuery };
