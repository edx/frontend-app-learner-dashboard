import { useMemo, useState } from 'react';
import {
  COMPLETE_STATE, DEFAULT_STATE, PENDING_STATE,
} from '../utils/constants';
import { saveProgressiveProfiling } from '../api/service';
import { progressiveProfilingFields } from '../data/progressiveProfilingFields';

export default function useProgressiveProfilingForm() {
  const [submitState, setSubmitState] = useState(DEFAULT_STATE);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({});

  const fieldData = progressiveProfilingFields;

  const fieldList = useMemo(
    () => Object.keys(fieldData.fields).map((key) => fieldData.fields[key]),
    [fieldData],
  );

  const onChangeHandler = (event) => {
    const {
      name, type, value, checked,
    } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submit = async () => {
    try {
      setSubmitState(PENDING_STATE);
      setError(null);
      await saveProgressiveProfiling(values, fieldData.extendedProfile || []);
      setSubmitState(COMPLETE_STATE);
      return true;
    } catch (err) {
      setSubmitState(DEFAULT_STATE);
      setError(err);
      return false;
    }
  };

  return {
    loadState: COMPLETE_STATE,
    submitState,
    error,
    values,
    fieldList,
    onChangeHandler,
    submit,
    redirectUrl: fieldData.redirectUrl || '',
    extendedProfileFieldNames: fieldData.extendedProfile || [],
  };
}
