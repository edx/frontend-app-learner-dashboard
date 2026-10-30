import React from 'react';
import {
  render,
} from '@testing-library/react';

import CohesionWrapper from './CohesionWrapper';

describe('Cohesion Wrapper loads', () => {
  it('should load the Cohesion wrapper into the head', () => {
    render(<CohesionWrapper />);
    const script = document.getElementsByTagName('script')[0];

    expect(window.chsn_pageType).toEqual('lms-homepage');
    expect(script.dataset.testId).toEqual('cohesion-test');
  });
});
