import { createInstance } from '@optimizely/react-sdk';
import { getAppConfig } from '@openedx/frontend-base';

const DEFAULT_OPTIMIZELY_AGENT_CONFIG = {
  eventFlushInterval: 1000,
  eventBatchSize: 10,
};

/**
 * Initializing the Optimizely instance at the top-level will not work, because it may be initialized before
 * the OPTIMIZELY_FULL_STACK_SDK_KEY is available and will not be reinitialized afterward. Wrapping the initialization
 * in a function allows components to request the instance as-needed.
 */
const getOptimizely = () => {
  const appConfig = getAppConfig?.() || {};
  const OPTIMIZELY_SDK_KEY = appConfig.OPTIMIZELY_FULL_STACK_SDK_KEY;
  const OPTIMIZELY_AGENT_CONFIG = appConfig.OPTIMIZELY_AGENT_CONFIG || {};

  if (OPTIMIZELY_SDK_KEY) {
    return createInstance({
      sdkKey: OPTIMIZELY_SDK_KEY,
      ...{
        ...DEFAULT_OPTIMIZELY_AGENT_CONFIG,
        ...OPTIMIZELY_AGENT_CONFIG,
      },
    });
  }

  return null;
};

export default getOptimizely;
