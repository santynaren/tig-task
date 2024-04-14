import * as urlHelper from './url.helper';

describe('urlHelper Core Tests', () => {
  jest.mock('./url.helper', () => 'test12');
  it('returns string as return', () => {
    const executeFunction = urlHelper.getNewShortUrl();
    expect(typeof executeFunction).toBe('string');
    expect(executeFunction).toHaveLength(5);
  });
});
