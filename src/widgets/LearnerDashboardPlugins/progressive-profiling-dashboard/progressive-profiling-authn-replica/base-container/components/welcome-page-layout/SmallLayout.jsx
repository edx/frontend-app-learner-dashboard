import React from 'react';
import PropTypes from 'prop-types';

import { getAppConfig } from '@openedx/frontend-base';
import { useIntl } from '@openedx/frontend-base';
import { Hyperlink, Image } from '@openedx/paragon';

import messages from './messages';

const SmallLayout = ({ enterpriseBranding }) => {
  const { formatMessage } = useIntl();

  const enterpriseLogoUrl = enterpriseBranding?.enterpriseLogoUrl || null;
  const enterpriseName = enterpriseBranding?.enterpriseName || null;
  const enterpriseWelcomeHtml = enterpriseBranding?.enterpriseBrandedWelcomeString
    || enterpriseBranding?.platformWelcomeString
    || '';

  const siteName = getAppConfig().SITE_NAME;
  const baseLogoSrc = getAppConfig().LOGO_WHITE_URL || getAppConfig().LOGO_URL;

  return (
    <div className="min-vw-100 bg-primary-400 auth-hero-left">
      <div className="col-md-12 small-screen-top-stripe" />
      <Hyperlink destination={getAppConfig().MARKETING_SITE_BASE_URL}>
        <Image className="logo-small auth-hero-base-logo" alt={siteName} src={baseLogoSrc} />
      </Hyperlink>

      <div className="auth-hero-content d-flex flex-column">
        <div className="d-flex align-items-center">
          {enterpriseLogoUrl && (
            <div className="auth-hero-enterprise-logo-wrapper mr-4">
              <Image
                alt={enterpriseName || 'Enterprise'}
                src={enterpriseLogoUrl}
                className="auth-hero-enterprise-logo"
              />
            </div>
          )}

          <div className="auth-hero-slash mr-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="191" height="250" viewBox="0 0 191 250" fill="none" style={{ width: '100%', height: '100%' }}>
              <line x1="69.8107" y1="33.833" x2="32.9503" y2="206.952" stroke="#F0CC00" strokeWidth="8" />
            </svg>
          </div>

          <div className="auth-hero-heading">
            <div className="auth-hero-heading-line text-white">
              {formatMessage(messages['start.learning'])}
            </div>
            <div className="auth-hero-heading-line text-accent-a">
              {formatMessage(messages['with.site.name'], { siteName })}
            </div>
          </div>
        </div>

        {enterpriseWelcomeHtml && (
          <div
            className="auth-hero-message mt-3"
            // eslint-disable-next-line react/no-danger
            // HTML is provided by trusted enterprise branding config (sanitized upstream).
            dangerouslySetInnerHTML={{
              __html: enterpriseWelcomeHtml,
            }}
          />
        )}
      </div>
    </div>
  );
};

SmallLayout.propTypes = {
  enterpriseBranding: PropTypes.shape({
    enterpriseLogoUrl: PropTypes.string,
    enterpriseName: PropTypes.string,
    enterpriseBrandedWelcomeString: PropTypes.string,
    platformWelcomeString: PropTypes.string,
  }),
};

SmallLayout.defaultProps = {
  enterpriseBranding: null,
};

export default SmallLayout;
