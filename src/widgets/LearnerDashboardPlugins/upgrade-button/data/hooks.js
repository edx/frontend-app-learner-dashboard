/* eslint-disable import/no-named-as-default-member */
import { useWindowSize, breakpoints } from '@openedx/paragon';
import { useCourseData, useIsMasquerading } from '@src/hooks';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.medium.maxWidth && width > breakpoints.small.maxWidth;
};

export const useActionDisabledState = (cardId) => {
  const isMasquerading = useIsMasquerading();
  const courseData = useCourseData(cardId);
  const { canUpgrade } = courseData?.enrollment || {};
  const { upgradeUrl } = courseData?.courseRun || {};

  const disableUpgradeCourse = !upgradeUrl || (isMasquerading && !canUpgrade);

  return {
    disableUpgradeCourse,
  };
};
