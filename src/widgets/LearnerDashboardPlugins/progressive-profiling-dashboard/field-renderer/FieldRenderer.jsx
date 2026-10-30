import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@openedx/paragon';

const FormFieldRenderer = ({
  fieldData, value, onChangeHandler, className,
}) => {
  switch (fieldData.type) {
    case 'select':
      return (
        <Form.Group controlId={fieldData.name}>
          <Form.Control
            as="select"
            className={className}
            name={fieldData.name}
            value={value ?? ''}
            onChange={onChangeHandler}
            floatingLabel={fieldData.label}
          >
            <option value="">{fieldData.label}</option>
            {fieldData.options.map(option => (
              <option key={option[0]} value={option[0]}>
                {option[1]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );

    case 'textarea':
      return (
        <Form.Group controlId={fieldData.name}>
          <Form.Control
            as="textarea"
            className={className}
            name={fieldData.name}
            value={value ?? ''}
            onChange={onChangeHandler}
            floatingLabel={fieldData.label}
          />
        </Form.Group>
      );

    case 'checkbox':
      return (
        <Form.Group controlId={fieldData.name}>
          <Form.Checkbox
            id={fieldData.name}
            name={fieldData.name}
            checked={!!value}
            onChange={onChangeHandler}
          >
            {fieldData.label}
          </Form.Checkbox>
        </Form.Group>
      );

    default:
      return (
        <Form.Group controlId={fieldData.name}>
          <Form.Control
            className={className}
            name={fieldData.name}
            value={value ?? ''}
            onChange={onChangeHandler}
            floatingLabel={fieldData.label}
          />
        </Form.Group>
      );
  }
};

FormFieldRenderer.propTypes = {
  fieldData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.string),
    ),
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChangeHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FormFieldRenderer;
