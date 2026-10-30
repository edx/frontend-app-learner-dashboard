import React from 'react';
import {
  render,
} from '@testing-library/react';

import UclWrapper from './UclWrapper';

describe('UCL Wrapper loads', () => {
  it('should load the UCL wrapper into the head', () => {
    render(<UclWrapper />);
    const script = document.querySelector('[data-test-id="ucl-test"]');

    // eslint-disable-next-line no-underscore-dangle
    expect(window._UCL.identity).toEqual('2u-edx-learner-dashboard');
    expect(script.dataset.testId).toEqual('ucl-test');
  });
});
