import { getAppConfig } from '@openedx/frontend-base';

import getOptimizely from './optimizely';

const originalConfig = jest.requireActual('@openedx/frontend-base').getAppConfig();
jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getAppConfig: jest.fn(),
}));
getAppConfig.mockImplementation(() => originalConfig);

describe('Optimizely', () => {
  test('getOptimizely returns null when OPTIMIZELY_FULL_STACK_SDK_KEY config variable is missing', () => {
    getAppConfig.mockImplementation(() => ({}));
    expect(getOptimizely()).toEqual(null);
  });
  test('getOptimizely returns non-null when OPTIMIZELY_FULL_STACK_SDK_KEY config variable is available', () => {
    getAppConfig.mockImplementation(() => originalConfig);
    expect(getOptimizely()).not.toEqual(null);
  });
});
