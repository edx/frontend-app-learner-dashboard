import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from '@openedx/paragon';
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform/utils';
import { getProgramProgressData } from '../data/api';
import { ProgramProgressContext, ProgramProgressContextValueType } from './ProgramProgressProvider.tsx';
import ProgramProgressCourses from './ProgramProgressCourses';
import ProgramProgressHeader from './ProgramProgressHeader';
import ProgramProgressSidebar from './ProgramProgressSidebar';
import ProgramProgressInfo from './ProgramProgressInfo';

import './index.scss';

// TODO: write tests for this file once all child components are done
const ProgramProgress: React.FC = () => {
  const {
    programProgressData,
    setProgramProgressData,
  } = useContext<ProgramProgressContextValueType>(ProgramProgressContext);

  const [programProgressEndpointError, setProgramProgressEndpointError] = useState<Boolean>(false);
  const hasProgramProgressData : Boolean = programProgressData?.courseData
  && programProgressData.programData
  && programProgressData.urls;

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
  }, [uuid, setProgramProgressData]);

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
      <Helmet title={`${programData?.title}`} />
      <Container fluid={false} size="lg" className="p-4.5">
        <ProgramProgressHeader
          programTitle={programData?.title}
          programType={programData?.type}
          authoringOrganizations={programData?.authoringOrganizations}
        />
        <Row>
          <Col sm={12} md={8} className="px-4.5">
            <ProgramProgressInfo
              allCoursesCompleted={allCoursesCompleted}
              totalCoursesInProgram={totalCoursesInProgram}
            />
            <ProgramProgressCourses courseData={courseData} />
          </Col>
          <Col sm={12} md={4}>
            <ProgramProgressSidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProgramProgress;
