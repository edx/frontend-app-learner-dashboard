import React from 'react';

import { breakpoints } from '@openedx/paragon';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import { AuthLargeLayout, AuthMediumLayout, AuthSmallLayout } from './components/welcome-page-layout';

const BaseContainer = ({ children, enterpriseBranding }) => {
  const brandingData = enterpriseBranding?.thirdPartyAuthContext?.enterpriseBranding;

  return (
    <>
      <div className="col-md-12 extra-large-screen-top-stripe" />
      <div className="layout">
        <MediaQuery maxWidth={breakpoints.small.maxWidth - 1}>
          <AuthSmallLayout enterpriseBranding={brandingData} />
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.medium.minWidth} maxWidth={breakpoints.large.maxWidth - 1}>
          <AuthMediumLayout enterpriseBranding={brandingData} />
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.extraLarge.minWidth}>
          <AuthLargeLayout enterpriseBranding={brandingData} />
        </MediaQuery>
        <div className="content">
          {children}
        </div>
      </div>
    </>
  );
};

BaseContainer.defaultProps = {
  enterpriseBranding: null,
};

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
  enterpriseBranding: PropTypes.shape({
    thirdPartyAuthContext: PropTypes.shape({
      enterpriseBranding: PropTypes.shape({}),
    }),
  }),
};

export default BaseContainer;
