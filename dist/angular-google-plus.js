/*! angular-google-plus - v0.1.1 2014-04-27 */
/**
 * Options object available for module
 * options/services definition.
 * @type {Object}
 */
var options = {};

/**
 * googleplus module
 */
angular.module("googleplus", []).provider("GooglePlus", [ function() {
    /**
     * clientId
     * @type {Number}
     */
    options.clientId = null;
    this.setClientId = function(a) {
        options.clientId = a;
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
    this.setApiKey = function(a) {
        options.apiKey = a;
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
    options.scopes = "https://www.googleapis.com/auth/plus.login";
    this.setScopes = function(a) {
        options.scopes = a;
        return this;
    };
    this.getScopes = function() {
        return options.scopes;
    };
    /**
     * Init Google Plus API
     */
    this.init = function(a) {
        angular.extend(options, a);
    };
    /**
     * This defines the Google Plus Service on run.
     */
    this.$get = [ "$q", "$rootScope", "$timeout", function(a, b, c) {
        /**
       * Create a deferred instance to implement asynchronous calls
       * @type {Object}
       */
        var d = a.defer();
        /**
       * NgGooglePlus Class
       * @type {Class}
       */
        var e = function() {};
        e.prototype.login = function() {
            gapi.auth.authorize({
                client_id: options.clientId,
                scope: options.scopes,
                immediate: false
            }, this.handleAuthResult);
            return d.promise;
        };
        e.prototype.checkAuth = function() {
            gapi.auth.authorize({
                client_id: options.clientId,
                scope: options.scopes,
                immediate: true
            }, this.handleAuthResult);
        };
        e.prototype.handleClientLoad = function() {
            gapi.client.setApiKey(options.apiKey);
            gapi.auth.init(function() {});
            c(this.checkAuth, 1);
        };
        e.prototype.handleAuthResult = function(a) {
            if (a && !a.error) {
                d.resolve(a);
                b.$apply();
            } else {
                d.reject("error");
            }
        };
        e.prototype.getUser = function() {
            var c = a.defer();
            gapi.client.load("oauth2", "v2", function() {
                gapi.client.oauth2.userinfo.get().execute(function(a) {
                    c.resolve(a);
                    b.$apply();
                });
            });
            return c.promise;
        };
        e.prototype.getToken = function() {
            return gapi.auth.getToken();
        };
        e.prototype.setToken = function(a) {
            return gapi.auth.setToken(a);
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