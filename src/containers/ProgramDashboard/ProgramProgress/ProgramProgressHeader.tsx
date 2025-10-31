import React from 'react';
import { ProgramProgressHeaderProps } from '../data/types';
import { getProgramIcon } from '../data/util';

const ProgramProgressHeader: React.FC<ProgramProgressHeaderProps> = ({
  programTitle, programType, authoringOrganizations,
}) => {
  const programIcon = getProgramIcon(programType);

  return (
    <div>
      <p>
        {programTitle}
      </p>
      <p>
        {programType}
      </p>
      <p>
        {authoringOrganizations && authoringOrganizations.length}
      </p>
      <img src={programIcon} alt={`${programType} icon`} />
    </div>
  );
};

export default ProgramProgressHeader;
