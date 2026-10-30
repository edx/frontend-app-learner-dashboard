import { renderHook, waitFor } from '@testing-library/react';
import { getAppConfig } from '@openedx/frontend-base';
import { useNoticesRedirectData } from './hooks';
import { getNotices } from './api';

jest.mock('@openedx/frontend-base', () => ({
  getAppConfig: jest.fn(),
}));

jest.mock('./api', () => ({
  getNotices: jest.fn(),
}));

jest.mock('@openedx/frontend-base', () => {
  const { formatMessage: fn } = jest.requireActual('testUtils');
  return {
    ...jest.requireActual('@openedx/frontend-base'),
    useIntl: () => ({
      formatMessage: fn,
    }),
  };
});

jest.mock('react-router-dom', () => ({
  redirect: jest.fn(),
}));

describe('useNoticesRedirectData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAppConfig.mockReturnValue({ ENABLE_NOTICES: true });
  });

  it('should initialize with isRedirected set to false', () => {
    getAppConfig.mockReturnValueOnce({ ENABLE_NOTICES: false });
    const { result } = renderHook(() => useNoticesRedirectData());

    expect(result.current.isRedirected).toBe(false);
  });

  it('should call getNotices API if ENABLE_NOTICES is true', () => {
    renderHook(() => useNoticesRedirectData());

    expect(getNotices).toHaveBeenCalledTimes(1);
  });

  it('should NOT call getNotices API if ENABLE_NOTICES is false', () => {
    getAppConfig.mockReturnValueOnce({ ENABLE_NOTICES: false });
    renderHook(() => useNoticesRedirectData());

    expect(getNotices).not.toHaveBeenCalled();
  });

  it('should NOT redirect or set isRedirected if API returns no results or empty data', () => {
    const apiResponses = [
      { data: { results: [] } }, // Empty array
      { data: {} }, // Missing results property
      {}, // Missing data property
      { data: { results: null } }, // Null results
    ];

    apiResponses.forEach((response) => {
      getNotices.mockImplementation(({ onLoad }) => {
        onLoad(response);
      });
      const { result } = renderHook(() => useNoticesRedirectData());

      expect(result.current.isRedirected).toBe(false);
    });
  });

  it('should redirect and set isRedirected to true if API returns results', async () => {
    const targetUrl = 'http://notices.example.com/notice';
    const apiResponse = {
      data: {
        results: [targetUrl, 'extra-url-ignored'], // Only the first URL is used
      },
    };

    getNotices.mockImplementation(({ onLoad }) => {
      onLoad(apiResponse);
    });
    const { result } = renderHook(() => useNoticesRedirectData());

    // Wait for the asynchronous effect hook to run and trigger state update/redirect
    await waitFor(() => {
      expect(result.current.isRedirected).toBe(true);
    });
  });
});
