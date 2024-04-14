import * as urlHelper from './url.helper';

describe('urlHelper Core Tests', () => {
  jest.mock('./url.helper', () => 'test12');
  it('returns string as return', () => {
    const executeFunction = urlHelper.getNewShortUrl();
    expect(typeof executeFunction).toBe('string');
    expect(executeFunction).toHaveLength(5);
  });
  it('returns string as return', () => {
    const executeFunction = urlHelper.validateShortUrl('/test123');
    expect(executeFunction).toBe(false);
  });
  it('returns string as return', () => {
    const executeFunction = urlHelper.validateShortUrl('/test123/test4');
    expect(executeFunction).toBe(true);
  });
});
