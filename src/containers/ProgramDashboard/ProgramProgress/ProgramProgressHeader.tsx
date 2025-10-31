import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Row, Col } from '@openedx/paragon';
import { ProgramProgressHeaderProps } from '../data/types';
import { getProgramIcon } from '../data/util';

import messages from './messages';

const ProgramProgressHeader: React.FC<ProgramProgressHeaderProps> = ({
  programTitle, programType, authoringOrganizations,
}) => {
  const { formatMessage } = useIntl();
  const programIcon = getProgramIcon(programType);

  return (
    <Row className="justify-content-between pb-4.5">
      <Col sm={8} xs={12}>
        <img src={programIcon} alt={`${programType} icon`} className="program-icon" />
        <h2 className="program-title">
          {programTitle}
        </h2>
      </Col>
      {authoringOrganizations && authoringOrganizations?.length > 0 && (
        <Col sm={4} className="text-center">
          <div className="font-weight-bold">
            {formatMessage(messages.programProgressInstitutions)}
          </div>
          <div>
            {authoringOrganizations.map(org => (
              <img
                key={org.uuid}
                id="org-image"
                src={org.certificateLogoImageUrl || org.logoImageUrl}
                className="container-mw-md"
                alt={`${org.name}'s logo`}
              />
            ))}
          </div>
        </Col>
      )}
    </Row>
  );
};

export default ProgramProgressHeader;
