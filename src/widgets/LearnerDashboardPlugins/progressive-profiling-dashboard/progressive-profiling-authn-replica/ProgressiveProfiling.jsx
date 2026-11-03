import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useIntl } from '@openedx/frontend-base';
import { getAppConfig } from '@openedx/frontend-base';
import { getAuthenticatedUser, getAuthenticatedHttpClient } from '@openedx/frontend-base';
import { identifyAuthenticatedUser } from '@openedx/frontend-base';
import {
  Form, Hyperlink, StatefulButton, Alert,
} from '@openedx/paragon';
import messages from './messages';

import useProgressiveProfilingForm from '../hooks/useProgressiveProfilingForm';

import BaseContainer from './base-container';
import { FormFieldRenderer } from '../field-renderer';
import ProgressiveProfilingPageModal from './ProgressiveProfilingPageModal';

import getThirdPartyAuthContext from './service/getThirdPartyAuthContext';

import {
  trackProgressiveProfilingSkipLinkClick, trackProgressiveProfilingSubmitClick,
  trackProgressiveProfilingSupportLinkClick, trackProgressiveProfilingPageViewed,
} from '../../tracking/trackers/progressiveProfiling';

import { PENDING_STATE, COMPLETE_STATE } from '../utils/constants';

import './index.scss';

const ProgressiveProfilingPage = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const authenticatedUser = getAuthenticatedUser();
  const client = getAuthenticatedHttpClient();
  const {
    loadState, submitState, error, values, fieldList, onChangeHandler, submit,
  } = useProgressiveProfilingForm(authenticatedUser.username, client);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submit();
    if (!success) { return; }

    trackProgressiveProfilingSubmitClick({
      isGenderSelected: !!values.gender,
      isYearOfBirthSelected: !!values.year_of_birth,
      isLevelOfEducationSelected: !!values.level_of_education,
      isWorkExperienceSelected: !!values.work_experience,
    });
    navigate('/', { replace: true });
  };

  const handleSkip = () => {
    trackProgressiveProfilingSkipLinkClick();
    setShowModal(true);
  };

  const [mfeContext, setMfeContext] = useState(null);

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const data = await getThirdPartyAuthContext();
        setMfeContext(data);
      } catch (err) {
        // Allow the page to render even if enterprise context cannot be fetched.
        setMfeContext(null);
      }
    };
    fetchContext();
  }, []);

  useEffect(() => {
    const userId = authenticatedUser?.userId;
    if (userId) {
      identifyAuthenticatedUser(userId);
      trackProgressiveProfilingPageViewed();
    }
  }, [authenticatedUser?.userId]);

  return (
    <BaseContainer enterpriseBranding={mfeContext}>
      <Helmet>
        <title>{formatMessage(
          messages['progressive.profiling.page.title'],
          { siteName: getAppConfig().SITE_NAME },
        )}
        </title>
      </Helmet>
      <ProgressiveProfilingPageModal isOpen={showModal} redirectUrl="/" />
      <div className="mw-xs m-4 pp-page-content">
        <div>
          <h2 className="pp-page__heading text-primary">{formatMessage(messages['progressive.profiling.page.heading'])}</h2>
        </div><hr className="border-light-700 mb-4" />
        {error && (
        <Alert variant="danger">
          <Alert.Heading>{formatMessage(messages['welcome.page.error.heading'])}</Alert.Heading>
          <p>{formatMessage(messages['welcome.page.error.message'])}</p>
        </Alert>
        )}
        <Form>
          {fieldList.map((fieldData) => (
            <FormFieldRenderer
              key={fieldData.name}
              fieldData={fieldData}
              value={values[fieldData.name]}
              onChangeHandler={onChangeHandler}
            />
          ))}
          {(getAppConfig().AUTHN_PROGRESSIVE_PROFILING_SUPPORT_LINK) && (
            <span className="pp-page__support-link">
              <Hyperlink
                isInline
                variant="muted"
                destination={getAppConfig().AUTHN_PROGRESSIVE_PROFILING_SUPPORT_LINK}
                target="_blank"
                showLaunchIcon={false}
                onClick={() => (trackProgressiveProfilingSupportLinkClick())}
              >
                {formatMessage(messages['optional.fields.information.link'])}
              </Hyperlink>
            </span>
          )}
          <div className="d-flex mt-4 mb-3">
            <StatefulButton
              type="submit"
              variant="brand"
              className="pp-page__button-width"
              state={submitState}
              labels={{
                default: formatMessage(messages['optional.fields.submit.button']),
                pending: '',
              }}
              onClick={handleSubmit}
              onMouseDown={(e) => e.preventDefault()}
              disabled={loadState !== COMPLETE_STATE || submitState === PENDING_STATE}
            />
            <StatefulButton
              className="text-gray-700 font-weight-500"
              type="button"
              variant="link"
              labels={{
                default: formatMessage(messages['optional.fields.skip.button']),
              }}
              onClick={handleSkip}
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        </Form>
      </div>
    </BaseContainer>
  );
};

export default ProgressiveProfilingPage;
