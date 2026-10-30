import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function useUCL(timeout = 5000) {
  const [ucl, setUcl] = useState(() => window.UCL);
  useEffect(() => {
    if (ucl) { return undefined; }
    const start = Date.now();
    const id = setInterval(() => {
      if (window.UCL) {
        setUcl(window.UCL);
        clearInterval(id);
      } else if (Date.now() - start > timeout) {
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, [ucl, timeout]);
  return ucl;
}
class RenderFallbackSignal extends Error {
  constructor() {
    super('Render fallback requested by widget');
    this.name = 'RenderFallbackSignal';
  }
}

const DynamicExperienceSlot = ({ widgetName, ...rest }) => {
  const ref = useRef(null);
  const UCL = useUCL();
  const [shouldThrow, setShouldThrow] = useState(false);
  const [error, setError] = useState(null);

  // Lock props to prevent unnecessary re-renders
  const restPropsRef = useRef(rest);
  // Update ref on each render to prevent stale props
  restPropsRef.current = rest;

  useEffect(() => {
    const refCurrent = ref.current;
    if (!refCurrent || !UCL) { return undefined; }
    try {
      UCL.mount(widgetName, refCurrent, {
        ...restPropsRef.current,
        onFallbackShouldRender: setShouldThrow,
      });
    } catch (e) {
      setError(e);
    }
    return () => UCL.unmount(refCurrent);
  }, [widgetName, UCL]);
  if (error) { throw error; }
  if (shouldThrow) { throw new RenderFallbackSignal(); }
  return <div ref={ref} />;
};

DynamicExperienceSlot.propTypes = {
  widgetName: PropTypes.string.isRequired,
};

export default DynamicExperienceSlot;
