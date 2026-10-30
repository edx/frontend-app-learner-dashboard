import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { Hyperlink } from '@openedx/paragon';

import { useCourseData } from 'hooks';
import CourseBanner from './CourseBanner';

import messages from './messages';
import { formatMessage } from '@src/testUtils';

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  Hyperlink: () => 'Hyperlink',
}));

jest.mock('moment', () => ({
  __esModule: true,
  default: (date) => ({
    toDate: jest.fn().mockReturnValue(date),
  }),
}));

jest.mock('./Banner', () => 'Banner');
jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}), { virtual: true });

const cardId = 'my-test-course-number';

let el;

const enrollmentData = {
  isVerified: false,
  canUpgrade: false,
  isAuditAccessExpired: false,
  coursewareAccess: {
    hasUnmetPrerequisites: false,
    isStaff: false,
    isTooEarly: false,
  },
};
const courseRunData = {
  isStarted: false,
  isArchived: false,
  startDate: '11/11/3030',
  marketingUrl: 'marketing-url',
};

const render = (overrides = {}) => {
  const {
    courseRun = {},
    enrollment = {},
  } = overrides;
  useCourseData.mockReturnValueOnce({
    courseRun: { ...courseRunData, ...courseRun },
    enrollment: { ...enrollmentData, ...enrollment },
  });
  el = shallow(<CourseBanner cardId={cardId} />);
};

describe('CourseBanner', () => {
  test('initializes data with course number from enrollment, course and course run data', () => {
    render();
    expect(useCourseData).toHaveBeenCalledWith(cardId);
  });
  test('no display if learner is verified', () => {
    render({ enrollment: { isVerified: true } });
    expect(el.isEmptyRender()).toEqual(true);
  });
  describe('audit access expired, can upgrade', () => {
    beforeEach(() => {
      render({ enrollment: { isAuditAccessExpired: true, canUpgrade: true } });
    });
    test('snapshot: (auditAccessExpired, upgradeToAccess)', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
    test('messages: (auditAccessExpired, upgradeToAccess)', () => {
      expect(el.instance.children[0].children[0].el).toContain(messages.auditAccessExpired.defaultMessage);
      expect(el.instance.children[0].children[2].el).toContain(messages.upgradeToAccess.defaultMessage);
    });
  });
  describe('audit access expired, cannot upgrade', () => {
    beforeEach(() => {
      render({ enrollment: { isAuditAccessExpired: true } });
    });
    test('snapshot: (auditAccessExpired, findAnotherCourse hyperlink)', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
    test('messages: (auditAccessExpired, upgradeToAccess)', () => {
      expect(el.instance.children[0].children[0].el).toContain(messages.auditAccessExpired.defaultMessage);
      expect(el.instance.findByType(Hyperlink)[0].children[0].el).toEqual(messages.findAnotherCourse.defaultMessage);
    });
  });
  describe('course run has started, is not archived, and cannot upgrade', () => {
    beforeEach(() => {
      render({
        courseRun: {
          isStarted: true, isArchived: false,
        },
      });
    });
    test('snapshot: (upgradeDeadlinePassed, exploreCourseDetails hyperlink)', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
    test('messages: (upgradeDeadlinePassed, exploreCourseDetails hyperlink)', () => {
      expect(el.instance.children[0].children[0].el).toContain(messages.upgradeDeadlinePassed.defaultMessage);
      const link = el.instance.findByType(Hyperlink);
      expect(link[0].children[0].el).toEqual(messages.exploreCourseDetails.defaultMessage);
      expect(link[0].props.destination).toEqual(courseRunData.marketingUrl);
    });
  });
  test('no display if audit access not expired and (course is not active or can upgrade)', () => {
    render();
    // isEmptyRender() isn't true because the minimal is <Fragment />
    expect(el.instance.children).toEqual([]);
    render({ enrollment: { canUpgrade: true }, courseRun: { isStarted: false } });
    expect(el.instance.children).toEqual([]);
  });
  describe('unmet prerequisites', () => {
    beforeEach(() => {
      render({ enrollment: { coursewareAccess: { hasUnmetPrerequisites: true } } });
    });
    test('snapshot: unmetPrerequisites', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
    test('messages: prerequisitesNotMet', () => {
      expect(el.instance.children[0].children[0].el).toContain(messages.prerequisitesNotMet.defaultMessage);
    });
  });
  describe('too early', () => {
    describe('no start date', () => {
      beforeEach(() => {
        render({ enrollment: { coursewareAccess: { isTooEarly: true } }, courseRun: { startDate: null } });
      });
      test('snapshot', () => expect(el.snapshot).toMatchSnapshot());
      test('messages', () => expect(el.instance.children).toEqual([]));
    });
    describe('has start date', () => {
      beforeEach(() => {
        render({ enrollment: { coursewareAccess: { isTooEarly: true } } });
      });
      test('snapshot', () => expect(el.snapshot).toMatchSnapshot());

      test('messages: courseHasNotStarted', () => {
        expect(el.instance.children[0].children[0].el).toContain(
          formatMessage(messages.courseHasNotStarted, { startDate: courseRunData.startDate }),
        );
      });
    });
  });
  describe('staff', () => {
    beforeEach(() => {
      render({ enrollment: { coursewareAccess: { isStaff: true } } });
    });
    test('snapshot: isStaff', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
  });
  test('snapshot: stacking banners', () => {
    render({
      enrollment: {
        coursewareAccess: {
          isStaff: true,
          isTooEarly: true,
          hasUnmetPrerequisites: true,
        },
      },
    });
    expect(el.snapshot).toMatchSnapshot();
  });
});
