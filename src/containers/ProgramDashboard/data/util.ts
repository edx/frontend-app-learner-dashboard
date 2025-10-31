import MicroMastersProgramDetailsSvgIcon from '../assets/micromasters-program-details.svg';
import ProfCertProgramDetailsSvgIcon from '../assets/professional-certificate-program-details.svg';
import XSeriesProgramDetailsSvgIcon from '../assets/xseries-program-details.svg';
import { PROGRAM_TYPE_MAP } from './constants';

export function getProgramIcon(type: string) {
  switch (type) {
    case PROGRAM_TYPE_MAP.XSERIES:
      return XSeriesProgramDetailsSvgIcon;
    case PROGRAM_TYPE_MAP.PROFESSIONAL_CERTIFICATE:
      return ProfCertProgramDetailsSvgIcon;
    case PROGRAM_TYPE_MAP.MICROMASTERS:
      return MicroMastersProgramDetailsSvgIcon;
    default:
      return '';
  }
}

export function isCourseRunEnded(run) {
  return !run.isEnrollmentOpen
    && run.isCourseEnded
    && run.status !== 'published';
}

export function getEnrolledCourseRunDetails(courses) {
  /**
   * returns the list of course runs for courses that are enrolled by user with only one run for each course.
   * if there are multiple enrolled course_runs then the most recent is selected.
   *
   * @param {Array} courses in progress or completed array of courses
   * @return {Array} array of course runs selected from course runs of each course
   */
  return courses?.map((course) => {
    const filteredRuns = course.courseRuns.filter(cRun => cRun.isEnrolled).sort(
      (a, b) => new Date(b.start).getMilliseconds() - new Date(a.start).getMilliseconds(),
    );
    // there will be at least one course run for each in_progress and completed courses
    const cRun = filteredRuns[0];
    return {
      start: cRun.start ? cRun.start : cRun.advertisedStart,
      title: cRun.title,
      key: course?.key,
      pacingType: cRun?.pacingType,
      certificateUrl: cRun?.certificateUrl,
      upgradeUrl: cRun?.upgradeUrl,
      expired: cRun?.expired,
      seats: cRun.seats ? cRun?.seats : [],
      isEnded: isCourseRunEnded(cRun),
    };
  });
}
