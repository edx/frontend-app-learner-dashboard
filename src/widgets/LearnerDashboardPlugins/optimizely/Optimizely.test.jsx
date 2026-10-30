import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { OptimizelyProvider, useDecision } from '@optimizely/react-sdk';
import { initializeIntl } from '../setupTest';

import OptimizelyExperiment from '.';
import getOptimizely from '../data';

jest.mock('@optimizely/react-sdk', () => {
  const originalModule = jest.requireActual('@optimizely/react-sdk');

  return {
    __esModule: true,
    ...originalModule,
    OptimizelyProvider: jest.fn((props) => (props.children)),
    useDecision: jest.fn(),
  };
});

jest.mock('@openedx/frontend-base', () => ({
  getAuthenticatedUser: jest.fn(() => ({ userId: 1 })),
}));

const DefaultComponent = () => (<div>default component</div>);
const ExperimentalComponent = () => (<div>experimental component</div>);
jest.mock('../data');
const mockOptimizelyObject = { track: jest.fn() };

describe('Optimizely Experiment', () => {
  beforeEach(async () => {
    initializeIntl();
    getOptimizely.mockReturnValue(mockOptimizelyObject);
  });

  afterEach(() => {
    getOptimizely.mockClear();
    mockOptimizelyObject.track.mockClear();
  });

  test('passes correct user ID as prop to OptimizelyProvider', () => {
    useDecision.mockReturnValueOnce([
      { enabled: false, variationKey: null },
      true,
    ]);

    render(
      <OptimizelyExperiment
        defaultComponent={DefaultComponent}
        experimentalComponent={ExperimentalComponent}
        experimentKey="key"
      />,
    );

    // Use an asymmetric matcher to only assert on the user prop because the optimizely prop is a large object.
    expect(OptimizelyProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          id: '1',
        }),
      }),
      expect.anything(),
    );
  });

  test('displays nothing when ReactSDKClient is not ready', () => {
    useDecision.mockReturnValueOnce([
      { enabled: false, variationKey: null },
      false,
    ]);

    const { container } = render(
      <OptimizelyExperiment
        defaultComponent={DefaultComponent}
        experimentalComponent={ExperimentalComponent}
        experimentKey="key"
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  test('displays default component when experiment is not enabled', async () => {
    useDecision.mockReturnValueOnce([
      { enabled: false, variationKey: null },
      true,
    ]);

    render(
      <OptimizelyExperiment
        defaultComponent={DefaultComponent}
        experimentalComponent={ExperimentalComponent}
        experimentKey="key"
      />,
    );
    await waitFor(() => expect(screen.getByText('default component')).toBeInTheDocument());
  });
  test('displays default component when experiment is enabled and variation is "off"', async () => {
    useDecision.mockReturnValueOnce([
      { enabled: true, variationKey: 'off' },
      true,
    ]);

    render(
      <OptimizelyExperiment
        defaultComponent={DefaultComponent}
        experimentalComponent={ExperimentalComponent}
        experimentKey="key"
        defaultVariationKey="off"
      />,
    );
    await waitFor(() => expect(screen.getByText('default component')).toBeInTheDocument());
  });
  test('displays default component when optimizely is null', async () => {
    getOptimizely.mockReturnValueOnce(null);

    render(
      <OptimizelyExperiment
        defaultComponent={DefaultComponent}
        experimentalComponent={ExperimentalComponent}
        experimentKey="key"
        defaultVariationKey="off"
      />,
    );
    await waitFor(() => expect(screen.getByText('default component')).toBeInTheDocument());
  });
  test('displays experimental component when experiment is enabled and variation is not "off"', async () => {
    useDecision.mockReturnValueOnce([
      { enabled: true, variationKey: 'experiment' },
      true,
    ]);

    render(
      <OptimizelyExperiment
        defaultComponent={DefaultComponent}
        experimentalComponent={ExperimentalComponent}
        experimentKey="key"
        defaultVariationKey="off"
      />,
    );
    await waitFor(() => expect(screen.getByText('experimental component')).toBeInTheDocument());
  });
});
