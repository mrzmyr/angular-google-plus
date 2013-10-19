(function (angular, gapi) {

  'use strict';

  /**
   * Options object available for module
   * options/services definition.
   * @type {Object}
   */
  var options = {};

  /**
   * googleplus module
   */
  angular.module('googleplus', []).

    /**
     * GooglePlus provider
     */
    provider('GooglePlus', [function() {

      /**
       * clientId
       * @type {Number}
       */
      options.clientId = null;

      this.setClientId = function(clientId) {
        options.clientId = clientId;
        return this;
      };

      this.getClientId = function() {
        return options.clientId;
      };

      /**
       * apiKey
       * @type {String}
       */
      options.apiKey = null;

      this.setApiKey = function(apiKey) {
        options.apiKey = apiKey;
        return this;
      };

      this.getApiKey = function() {
        return options.apiKey;
      };

      /**
       * Scopes
       * @default 'https://www.googleapis.com/auth/plus.login'
       * @type {Boolean}
       */
      options.scopes = 'https://www.googleapis.com/auth/plus.login';

      this.setScopes = function(scopes) {
        options.scopes = scopes;
        return this;
      };

      this.getScopes = function() {
        return options.scopes;
      };

      /**
       * Init Google Plus API
       */
      this.init = function(customOptions) {
        angular.extend(options, customOptions);
      };

      /**
       * This defines the Google Plus Service on run.
       */
      this.$get = ['$q', '$rootScope', '$timeout', function($q, $rootScope, $timeout) {

        /**
         * Create a deferred instance to implement asynchronous calls
         * @type {Object}
         */
        var deferred  = $q.defer();

        /**
         * NgGooglePlus Class
         * @type {Class}
         */
        var NgGooglePlus = function () {};

        NgGooglePlus.prototype.login =  function () {
            gapi.auth.authorize({
              client_id: options.clientId,
              scope: options.scopes,
              immediate: false
            }, this.handleAuthResult);
            return deferred.promise;
        };
        NgGooglePlus.prototype.checkAuth = function() {
            gapi.auth.authorize({
              client_id: options.clientId,
              scope: options.scopes,
              immediate: true
            }, this.handleAuthResult);
        };
        NgGooglePlus.prototype.handleClientLoad = function () {
            gapi.client.setApiKey(options.apiKey);
            gapi.auth.init(function () { });
            $timeout(this.checkAuth, 1);
        };
        NgGooglePlus.prototype.handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                var data = {};
                gapi.client.load('oauth2', 'v2', function () {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function (resp) {
                        data.email = resp.email;
                        data.uid = resp.id;
                        deferred.resolve(data);
                        $rootScope.$apply();
                    });
                });
            } else {
                deferred.reject('error');
            }
        };

        return new NgGooglePlus();
      }];
  }])

  // Initialization of module
  .run([function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/client.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  }]);

})(angular, gapi);