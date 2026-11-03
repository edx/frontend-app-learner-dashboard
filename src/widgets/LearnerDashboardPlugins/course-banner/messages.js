import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  auditAccessExpired: {
    id: 'learner-dash.courseCard.banners.auditAccessExpired',
    description: 'Audit access expiration banner message',
    defaultMessage: 'Your audit access to this course has expired.',
  },
  upgradeToAccess: {
    id: 'learner-dash.courseCard.banners.upgradeToAccess',
    description: 'Upgrade prompt for audit-expired learners that can still upgrade',
    defaultMessage: 'Upgrade now to access your course again.',
  },
  findAnotherCourse: {
    id: 'learner-dash.courseCard.banners.findAnotherCourse',
    description: 'Action prompt taking learners to course exploration',
    defaultMessage: 'Find another course',
  },
  upgradeDeadlinePassed: {
    id: 'learner-dash.courseCard.banners.upgradeDeadlinePassed',
    description: 'Audit upgrade deadline passed banner message',
    defaultMessage: 'Your upgrade deadline for this course has passed.  To upgrade, enroll in a session that is farther in the future.',
  },
  exploreCourseDetails: {
    id: 'learner-dash.courseCard.banners.exploreCourseDetails',
    description: 'Action prompt taking learners to course details page',
    defaultMessage: 'Explore course details.',
  },
  prerequisitesNotMet: {
    id: 'learner-dash.courseCard.banners.prerequisitesNotMet',
    description: 'Message to learners with unmet prerequisites',
    defaultMessage: 'You can\'t access this course just yet because you have not met the pre-requisites.',
  },
  courseHasNotStarted: {
    id: 'learner-dash.courseCard.banners.courseHasNotStarted',
    description: 'Course has not started message',
    defaultMessage: 'You can\'t access this course just yet because the course hasn\'t started yet. The course will start on {startDate}.',
  },
});

export default messages;
