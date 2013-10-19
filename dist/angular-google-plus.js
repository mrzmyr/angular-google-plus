/*! angular-google-plus - v0.1.0 2013-10-19 */
(function(a, b) {
    "use strict";
    /**
   * Options object available for module
   * options/services definition.
   * @type {Object}
   */
    var c = {};
    /**
   * googleplus module
   */
    b.module("googleplus", []).provider("GooglePlus", [ function() {
        /**
       * clientId
       * @type {Number}
       */
        c.clientId = null;
        this.setClientId = function(a) {
            c.clientId = a;
            return this;
        };
        this.getClientId = function() {
            return c.clientId;
        };
        /**
       * apiKey
       * @type {String}
       */
        c.apiKey = null;
        this.setApiKey = function(a) {
            c.apiKey = a;
            return this;
        };
        this.getApiKey = function() {
            return c.apiKey;
        };
        /**
       * Scopes
       * @default 'https://www.googleapis.com/auth/plus.login'
       * @type {Boolean}
       */
        c.scopes = "https://www.googleapis.com/auth/plus.login";
        this.setScopes = function(a) {
            c.scopes = a;
            return this;
        };
        this.getScopes = function() {
            return c.scopes;
        };
        /**
       * Init Facebook API required stuff
       * This will prepare the app earlier (on optionsuration)
       */
        this.init = function(a) {
            b.extend(c, a);
        };
        /**
       * This defines the Facebook Service on run.
       */
        this.$get = [ "$q", "$rootScope", function(b, c) {
            /**
         * Create a deferred instance to implement asynchronous calls
         * @type {Object}
         */
            var d = b.defer();
            /**
         * NgGooglePlus Class
         * @type {Class}
         */
            var e = function() {};
            e.prototype.login = function() {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: false
                }, this.handleAuthResult);
                return d.promise;
            };
            e.prototype.checkAuth = function() {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: true
                }, this.handleAuthResult);
            };
            e.prototype.handleClientLoad = function() {
                gapi.client.setApiKey(apiKey);
                gapi.auth.init(function() {});
                a.setTimeout(this.checkAuth, 1);
            };
            e.prototype.handleAuthClick = function(a) {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: false
                }, this.handleAuthResult);
                return false;
            };
            e.prototype.handleAuthResult = function(a) {
                if (a && !a.error) {
                    var b = {};
                    gapi.client.load("oauth2", "v2", function() {
                        var a = gapi.client.oauth2.userinfo.get();
                        a.execute(function(a) {
                            b.email = a.email;
                            b.uid = a.id;
                            d.resolve(b);
                            c.$apply();
                        });
                    });
                } else {
                    d.reject("error");
                }
            };
            return new e();
        } ];
    } ]).run([ function() {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = true;
        a.src = "https://apis.google.com/js/client.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b);
    } ]);
})(window, angular);