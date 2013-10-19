// JavaScript
describe('googlePlus Module specs', function () {
  var googlePlus, GooglePlusProvider;

  beforeEach(function () {
    // Load the service's module
    module('googleplus', function (_GooglePlusProvider_) {
      GooglePlusProvider = _GooglePlusProvider_;
      GooglePlusProvider.init({
        apiKey: 'daowpdmpomwa21o3no1in'
      });
    });

    inject(function (_GooglePlus_) {
      googleplus = _GooglePlus_;
    });
  });

  it('should exist', function () {
    expect(!!GooglePlusProvider).toBe(true);
  });

  describe('the provider api should provide', function () {

    it('appId as default value', function () {
      expect(GooglePlusProvider.getClientId()).toBe(null);
    });
    it('working getter / setter for appId', function () {
      GooglePlusProvider.setClientId('123456789101112');
      expect(GooglePlusProvider.getClientId()).toBe('123456789101112');
    });

    it('locale as default value', function () {
      expect(GooglePlusProvider.getApiKey()).toBe('daowpdmpomwa21o3no1in');
    });
    it('working getter / setter for locale', function () {
      GooglePlusProvider.setApiKey('g4ilu32b42iub34piu32b4liu23b4i23');
      expect(GooglePlusProvider.getApiKey()).toBe('g4ilu32b42iub34piu32b4liu23b4i23');
    });

    it('status as default value', function () {
      expect(GooglePlusProvider.getScopes()).toBe('https://www.googleapis.com/auth/plus.login');
    });
    it('working getter / setter for status', function () {
      GooglePlusProvider.setScopes('https://www.googleapis.com/auth/plus.me');
      expect(GooglePlusProvider.getScopes()).toBe('https://www.googleapis.com/auth/plus.me');
    });
  });
});