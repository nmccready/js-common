const config = require('./');

describe('js-common-eslint-config', () => {
  it('does not reference react', () => {
    // scan plugins for react and fail if it is found
    const hasReactPlugin =
      Object.prototype.hasOwnProperty.call(config, 'plugins') &&
      config.plugins.indexOf('react') !== -1;
    expect(hasReactPlugin, 'there is no react plugin').toEqual(false);

    // scan rules for react/ and fail if any exist
    const reactRuleIds = Object.keys(config.rules).filter(
      (ruleId) => ruleId.indexOf('react/') === 0
    );
    expect(reactRuleIds, 'there are no react/ rules').toHaveLength(0);
  });
});
