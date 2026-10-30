/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const useDecision = (experimentKey) => (
  // to modify toggle between experiments, fill in the variation key for the desired variation
  // if several optimizely experimentKeys exist, add a condition to select which experiment you are testing
  [{ enabled: true, variationKey: 'fill_in_this_section' }, true]
);

const OptimizelyProvider = ({ optimizely, user, children = null }) => children;

const createInstance = (args) => (true);

export { createInstance, useDecision, OptimizelyProvider };
