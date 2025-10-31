/* eslint-disable max-len */
import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ProgramProgressInfoProps } from '../data/types';
import messages from './messages';

const ProgramProgressInfo: React.FC<ProgramProgressInfoProps> = ({
  allCoursesCompleted, totalCoursesInProgram,
}) => {
  const { formatMessage } = useIntl();

  return (
    allCoursesCompleted
      ? (
        <div>
          <h3>{formatMessage(messages.programProgressCompleteHeader)}</h3>
          <p>{formatMessage(messages.programProgressCompleteText)}</p>
        </div>
      )
      : (
        <div>
          <h3>{formatMessage(messages.programProgressIncompleteHeader)}</h3>
          <p data-testid="program-incomplete-info-text">
            {formatMessage(messages.programProgressIncompleteText, { totalCoursesInProgram })}
          </p>
        </div>
      )
  );
};

export default ProgramProgressInfo;
