import { render } from '@testing-library/react';

// eslint-disable-next-line import/no-named-as-default
import useNoticesRedirectData from './hooks';
import NoticesRedirect from '.';

jest.mock('./hooks', () => jest.fn());

const hookProps = { isRedirected: false };

describe('NoticesRedirect component', () => {
  beforeEach(() => {
    useNoticesRedirectData.mockClear();
  });
  describe('behavior', () => {
    it('initializes hooks', () => {
      useNoticesRedirectData.mockReturnValue(hookProps);
      render(<NoticesRedirect />);
      expect(useNoticesRedirectData).toHaveBeenCalled();
    });
  });
});
