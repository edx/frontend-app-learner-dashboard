import React from 'react';
import PropTypes from 'prop-types';
import { getAppConfig } from '@openedx/frontend-base';
import { useIntl } from '@openedx/frontend-base';
import {
  Alert, Button, Form, Hyperlink, ModalDialog,
} from '@openedx/paragon';

import { FormFieldRenderer } from './field-renderer';
import useProgressiveProfilingForm from './hooks/useProgressiveProfilingForm';
import { COMPLETE_STATE, PENDING_STATE } from './utils/constants';
import messages from './progressive-profiling-authn-replica/messages';
import {
  trackProgressiveProfilingSkipLinkClick, trackProgressiveProfilingSubmitClick,
  trackProgressiveProfilingSupportLinkClick,
} from '../tracking/trackers/progressiveProfiling';

const ProgressiveProfilingModal = ({
  isOpen, onClose, clearTrigger,
}) => {
  const { formatMessage } = useIntl();
  const {
    loadState, submitState, error, values, fieldList, onChangeHandler, submit,
  } = useProgressiveProfilingForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submit();
    if (!success) { return; }

    trackProgressiveProfilingSubmitClick({
      isGenderSelected: !!values.gender,
      isLevelOfEducationSelected: !!values.level_of_education,
      host: window.location.origin,
    });

    clearTrigger();
    onClose();
  };

  const handleSkip = () => {
    trackProgressiveProfilingSkipLinkClick({ host: window.location.origin });
    clearTrigger();
    onClose();
  };

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={() => {}}
      hasCloseButton={false}
      size="md"
      title={formatMessage(messages['progressive.profiling.page.heading'])}
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {formatMessage(messages['progressive.profiling.page.heading'])}
        </ModalDialog.Title>
      </ModalDialog.Header>

      <ModalDialog.Body>
        {error && (
        <Alert variant="danger">
          <Alert.Heading>{formatMessage(messages['welcome.page.error.heading'])}</Alert.Heading>
          <p>{formatMessage(messages['welcome.page.error.message'])}</p>
        </Alert>
        )}
        <Form id="profileForm" onSubmit={handleSubmit}>
          {fieldList.map((fieldData) => (
            <FormFieldRenderer
              key={fieldData.name}
              fieldData={fieldData}
              value={values[fieldData.name]}
              onChangeHandler={onChangeHandler}
            />
          ))}

          {(getAppConfig().AUTHN_PROGRESSIVE_PROFILING_SUPPORT_LINK) && (
            <div className="mt-2">
              <Hyperlink
                destination={getAppConfig().AUTHN_PROGRESSIVE_PROFILING_SUPPORT_LINK}
                target="_blank"
                showLaunchIcon={false}
                onClick={() => trackProgressiveProfilingSupportLinkClick({ host: window.location.origin })}
              >
                {formatMessage(messages['optional.fields.information.link'])}
              </Hyperlink>
            </div>
          )}
        </Form>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <Button variant="link" onClick={handleSkip} disabled={submitState === PENDING_STATE}>
          {formatMessage(messages['optional.fields.skip.button'])}
        </Button>
        <Button variant="brand" type="submit" form="profileForm" disabled={loadState !== COMPLETE_STATE || submitState === PENDING_STATE}>
          {formatMessage(messages['optional.fields.submit.button'])}
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

ProgressiveProfilingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  clearTrigger: PropTypes.func.isRequired,
};

export default ProgressiveProfilingModal;
