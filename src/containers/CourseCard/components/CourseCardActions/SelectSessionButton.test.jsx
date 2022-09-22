import { shallow } from 'enzyme';

import SelectSessionButton from './SelectSessionButton';
import { hooks } from 'data/redux';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useUpdateSelectSessionModalCallback: () => jest.fn().mockName('mockOpenSessionModal'),
  },
}));

describe('SelectSessionButton', () => {
  const props = {
    cardId: 'cardId',
  };
  hooks.useCardCourseRunData.mockReturnValue({
    resumeUrl: 'resumeUrl'
  });
  const createWrapper = ({ hasAccess, canChange, hasSessions}) => {
    hooks.useCardEnrollmentData.mockReturnValueOnce({
      hasAccess
    });
    hooks.useCardEntitlementData.mockReturnValueOnce({
      canChange,
      hasSessions,
    });
    return shallow(<SelectSessionButton {...props} />);
  };
  describe('snapshot', () => {
    it('renders default button', () => {
      const wrapper = createWrapper({ hasAccess: true, canChange: true, hasSessions: true });
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button', () => {
      const wrapper = createWrapper({ hasAccess: false, canChange: true, hasSessions: true });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('behavior', () => {
    it('default render', () => {
      const wrapper = createWrapper({ hasAccess: true, canChange: true, hasSessions: true });
      expect(wrapper.prop('disabled')).toEqual(false);
      expect(wrapper.prop('href')).toEqual('resumeUrl');
      expect(wrapper.prop('onClick').getMockName())
        .toEqual(hooks.useUpdateSelectSessionModalCallback().getMockName());
    });
    it('disabled iif doesn\'t have access or user cannot change or doesn\'t have sessions', () => {
      const noAccess = createWrapper({ hasAccess: false, canChange: true, hasSessions: true });
      expect(noAccess.prop('disabled')).toEqual(true);

      const cannotChange = createWrapper({ hasAccess: true, canChange: false, hasSessions: true });
      expect(cannotChange.prop('disabled')).toEqual(true);

      const noSessions = createWrapper({ hasAccess: true, canChange: true, hasSessions: false });
      expect(noSessions.prop('disabled')).toEqual(true);
    });
  });
});