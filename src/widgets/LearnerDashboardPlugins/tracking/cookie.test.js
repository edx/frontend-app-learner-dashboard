import * as cookieFunctions from './cookie';

describe('cookie functions for Correlation ID', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });

    Object.defineProperty(global, 'crypto', {
      value: {
        randomUUID: jest.fn(() => 'mocked-random-uuid'),
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore the original document.cookie
  });

  describe('setCookie', () => {
    it('sets the Correlation ID cookie', () => {
      const correlationCookie = 'some_uuid_string';
      cookieFunctions.setCookie('tglr_correlation_id', correlationCookie);

      expect(document.cookie).toContain(`tglr_correlation_id=${correlationCookie}`);
    });
  });

  describe('handleCorrelationIDCookie', () => {
    it('returns the correlation ID provided by a random UUID generator', () => {
      expect(cookieFunctions.handleCorrelationIDCookie()).toEqual('mocked-random-uuid');
    });
  });
});
