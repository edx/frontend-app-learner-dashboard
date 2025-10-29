import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from '@openedx/paragon';
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform/utils';
import { getProgramProgressData } from '../data/api';
import { ProgramProgressData } from '../data/types';
import ProgramProgressCourses from './ProgramProgressCourses';
import ProgramProgressHeader from './ProgramProgressHeader';
import ProgramProgressSidebar from './ProgramProgressSidebar';
import ProgramProgressInfo from './ProgramProgressInfo';

const ProgramProgress: React.FC = () => {
  const [programProgressData, setProgramProgressData] = useState<ProgramProgressData>();
  const [programProgressEndpointError, setProgramProgressEndpointError] = useState(false);
  const hasProgramProgressData : Boolean = programProgressData?.courseData
  && programProgressData.programData
  && programProgressData.urls;

  // TODO: for review: https://stackoverflow.com/questions/75706357/react-useparams-returns-string-undefined
  const { uuid } = useParams() as { uuid: string };
  useEffect(() => {
    getProgramProgressData(uuid)
      .then(responseData => {
        setProgramProgressData(camelCaseObject(responseData.data));
      })
      .catch(err => {
        logError(err);
        setProgramProgressEndpointError(true);
      });
  }, [uuid]);

  if (programProgressEndpointError) {
    return (
      <div>Not found page</div>
    );
  }

  if (!hasProgramProgressData) {
    return (
      <div>Loading...</div>
    );
  }

  const programData = programProgressData?.programData;
  const courseData = programProgressData?.courseData;

  const totalCoursesInProgram = (courseData.notStarted?.length || 0)
    + (courseData.completed?.length || 0)
    + (courseData.inProgress?.length || 0);

  const allCoursesCompleted = !courseData.notStarted?.length
    && !courseData.inProgress?.length
    && courseData.completed?.length;

  return (
    <>
      <Helmet title={`${programData.title}`} />
      <Container>
        <ProgramProgressHeader
          programTitle={programData?.title}
          programType={programData?.type}
          authoringOrganizations={programData?.authoringOrganizations}
        />
        <Row>
          <Col>
            <ProgramProgressInfo
              allCoursesCompleted={allCoursesCompleted}
              totalCoursesInProgram={totalCoursesInProgram}
            />
            <ProgramProgressCourses courseData={courseData} />
          </Col>
          <Col>
            <ProgramProgressSidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProgramProgress;
