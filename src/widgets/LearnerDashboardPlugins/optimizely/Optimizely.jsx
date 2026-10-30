import PropTypes from 'prop-types';
import { getAuthenticatedUser } from '@openedx/frontend-base';
import { OptimizelyProvider, useDecision } from '@optimizely/react-sdk';

import { getLocale } from '@openedx/frontend-base';
import getOptimizely from '../data';

const OptimizelyExperimentController = (
  // Use defaultVariationKey if your experiment is set to target less than 100% of traffic
  // and you have a variation for users not included in the experiment.
  {
    defaultComponent: DefaultComponent,
    experimentalComponent: ExperimentalComponent,
    defaultVariationKey,
    experimentKey,
    ...props
  },
) => {
  const [decision, clientReady] = useDecision(experimentKey);
  const { enabled, variationKey } = decision;

  // The useDecision hook will still return a decision even though the ReactSDKClient might not be ready.
  // This `clientReady` will prevent the defaultComponent from appearing when the experiment variation should
  // be rendered.

  if (!clientReady) {
    return null;
  }

  const showDefault = !enabled || (defaultVariationKey && defaultVariationKey === variationKey);

  return (
    <div>
      {showDefault ? <DefaultComponent {...props} /> : <ExperimentalComponent {...props} />}
    </div>
  );
};

OptimizelyExperimentController.propTypes = {
  defaultComponent: PropTypes.elementType.isRequired,
  experimentalComponent: PropTypes.elementType.isRequired,
  defaultVariationKey: PropTypes.string,
  experimentKey: PropTypes.string.isRequired,
};

OptimizelyExperimentController.defaultProps = {
  defaultVariationKey: null,
};

const OptimizelyExperiment = (props) => {
  const { userId } = getAuthenticatedUser();
  const { defaultComponent: DefaultComponent } = props;

  const optimizely = getOptimizely();

  return (
    optimizely
      ? (
        // The Optimizely SDK requires the user ID to be a string.
        <OptimizelyProvider
          optimizely={optimizely}
          user={{
            id: userId.toString(),
            attributes: { lms_language_preference: getLocale() },
          }}
        >
          <OptimizelyExperimentController {...props} />
        </OptimizelyProvider>
      )
      : (<DefaultComponent {...props} />)
  );
};

OptimizelyExperiment.propTypes = {
  defaultComponent: PropTypes.elementType.isRequired,
};

export default OptimizelyExperiment;
