// general cookie setter, expires after 30 minutes
export function setCookie(cookieName, cookieValue) {
  const a = new Date();
  // set to expire after 30 minutes, or 1.8 million milliseconds
  a.setTime(a.getTime() + 1800000);
  document.cookie = `${cookieName}\x3d${cookieValue}; expires\x3d${a.toGMTString()}; path\x3d/; domain\x3d.edx.org;`;
}

export const handleCorrelationIDCookie = () => {
  // set correlation ID to a random UUID
  const correlationId = window.crypto.randomUUID();

  setCookie('tglr_correlation_id', correlationId);
  return correlationId;
};
