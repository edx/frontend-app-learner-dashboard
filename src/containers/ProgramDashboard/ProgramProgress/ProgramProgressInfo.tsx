import React from 'react';
import { ProgramProgressInfoProps } from '../data/types';

const ProgramProgressInfo: React.FC<ProgramProgressInfoProps> = ({
  allCoursesCompleted, totalCoursesInProgram,
}) => (
  allCoursesCompleted
    ? (
      <div>
        Render all courses completed text
      </div>
    )
    : (
      <div>
        Render upgrade button and info about the {totalCoursesInProgram} courses in this program
      </div>
    )
);

export default ProgramProgressInfo;
