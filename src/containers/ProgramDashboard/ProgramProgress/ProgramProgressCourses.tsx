import React from 'react';
import { ProgramProgressCoursesProps } from '../data/types';

const ProgramProgressCourses: React.FC<ProgramProgressCoursesProps> = ({
  courseData,
}) => (
  <div>
    {courseData.uuid}
    <div>
      || Courses In Progress ||
    </div>
    <div>
      || Courses Remaining ||
    </div>
    <div>
      || Courses Completed ||
    </div>
  </div>
);

export default ProgramProgressCourses;
