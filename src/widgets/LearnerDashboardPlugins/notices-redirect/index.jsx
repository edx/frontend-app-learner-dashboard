// eslint-disable-next-line import/no-named-as-default
import useNoticesRedirectData from './hooks';

/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
const NoticesRedirect = () => {
  useNoticesRedirectData();
  return null;
};

export default NoticesRedirect;
