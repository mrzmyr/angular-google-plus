describe('Service: ngGooglePlus', function () {
  var gp;

  beforeEach(function () {
    // Load the service's module
    module('googleplus');

    inject(function (GooglePlus) {
      gp = GooglePlus;
    });
  });

  it('should exist', function () {
    expect(!!gp).toBe(true);
  });

  it('login method return a defered object', function () {
    // expect(!!gp.login()).toBe(true);
  });
});