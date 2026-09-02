import { buildTrackingQuery } from './utils';

describe('buildTrackingQuery', () => {
  it('includes org_id', () => {
    expect(buildTrackingQuery('test-org-id')).toEqual('?org_id=test-org-id');
  });
  it('includes course_id when courseUuid is provided', () => {
    expect(buildTrackingQuery('test-org-id', 'test-course-uuid')).toEqual(
      '?org_id=test-org-id&course_id=test-course-uuid',
    );
  });
  it('omits course_id when courseUuid is not provided', () => {
    expect(buildTrackingQuery('test-org-id', undefined)).toEqual('?org_id=test-org-id');
  });
});
