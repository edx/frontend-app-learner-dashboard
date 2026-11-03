import moment from 'moment';
import { useIntl } from '@openedx/frontend-base';

export const dateFormatter = (formatDate, date) => formatDate(moment(date).toDate(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

// Hook
export const useFormatDate = () => {
  const { formatDate } = useIntl();
  return (date) => dateFormatter(formatDate, date);
};
