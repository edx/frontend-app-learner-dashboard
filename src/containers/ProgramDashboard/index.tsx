import { useEffect, useState } from 'react';
import { logError } from '@edx/frontend-platform/logging';
import { getProgramsListData } from './api';

const ProgramDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getProgramsListData()
      .then(responseData => setData(responseData))
      .catch(err => logError(err));
  }, []);

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};

export default ProgramDashboard;
