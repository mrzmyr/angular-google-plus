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
    a.module("googleplus", []).provider("GooglePlus", [ function() {
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
       * Init Google Plus API
       */
        this.init = function(b) {
            a.extend(c, b);
        };
        /**
       * This defines the Google Plus Service on run.
       */
        this.$get = [ "$q", "$rootScope", "$timeout", function(a, d, e) {
            /**
         * Create a deferred instance to implement asynchronous calls
         * @type {Object}
         */
            var f = a.defer();
            /**
         * NgGooglePlus Class
         * @type {Class}
         */
            var g = function() {};
            g.prototype.login = function() {
                b.auth.authorize({
                    client_id: c.clientId,
                    scope: c.scopes,
                    immediate: false
                }, this.handleAuthResult);
                return f.promise;
            };
            g.prototype.checkAuth = function() {
                b.auth.authorize({
                    client_id: c.clientId,
                    scope: c.scopes,
                    immediate: true
                }, this.handleAuthResult);
            };
            g.prototype.handleClientLoad = function() {
                b.client.setApiKey(c.apiKey);
                b.auth.init(function() {});
                e(this.checkAuth, 1);
            };
            g.prototype.handleAuthResult = function(a) {
                if (a && !a.error) {
                    var c = {};
                    b.client.load("oauth2", "v2", function() {
                        var a = b.client.oauth2.userinfo.get();
                        a.execute(function(a) {
                            c.email = a.email;
                            c.uid = a.id;
                            f.resolve(c);
                            d.$apply();
                        });
                    });
                } else {
                    f.reject("error");
                }
            };
            return new g();
        } ];
    } ]).run([ function() {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = true;
        a.src = "https://apis.google.com/js/client.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b);
    } ]);
})(angular, gapi);