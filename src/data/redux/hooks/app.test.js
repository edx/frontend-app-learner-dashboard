import * as module from './app';

describe('app hooks', () => {
  describe('useCardExecEdTrackingParam', () => {
    const cardId = 'test-card-id';

    beforeEach(() => {
      jest.spyOn(module, 'useCardEnrollmentData').mockReturnValue({ isExecEd2UCourse: true });
      jest.spyOn(module, 'useEnterpriseDashboardData').mockReturnValue({ authOrgId: 'test-org-id' });
      jest.spyOn(module, 'useCardCourseRunData').mockReturnValue({ courseUuid: 'test-course-uuid' });
    });

    it('returns an empty string for non-exec-ed courses', () => {
      jest.spyOn(module, 'useCardEnrollmentData').mockReturnValue({ isExecEd2UCourse: false });
      expect(module.useCardExecEdTrackingParam(cardId)).toEqual('');
    });

    it('returns org_id and course_id params for exec ed courses', () => {
      expect(module.useCardExecEdTrackingParam(cardId)).toEqual(
        '?org_id=test-org-id&course_id=test-course-uuid',
      );
    });

    it('omits course_id if courseUuid is not available', () => {
      jest.spyOn(module, 'useCardCourseRunData').mockReturnValue({ courseUuid: null });
      expect(module.useCardExecEdTrackingParam(cardId)).toEqual('?org_id=test-org-id');
    });

    it('omits org_id if authOrgId is not available', () => {
      jest.spyOn(module, 'useEnterpriseDashboardData').mockReturnValue({ authOrgId: null });
      expect(module.useCardExecEdTrackingParam(cardId)).toEqual('?course_id=test-course-uuid');
    });

    it('returns an empty string if neither authOrgId nor courseUuid are available', () => {
      jest.spyOn(module, 'useEnterpriseDashboardData').mockReturnValue({ authOrgId: null });
      jest.spyOn(module, 'useCardCourseRunData').mockReturnValue({ courseUuid: null });
      expect(module.useCardExecEdTrackingParam(cardId)).toEqual('');
    });
  });
});
