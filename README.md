angular-google-plus
==================

[![Build Status](https://travis-ci.org/mrzmyr/angular-google-plus.png)](https://travis-ci.org/mrzmyr/angular-google-plus) 
[![Dependency Status](https://david-dm.org/mrzmyr/angular-google-plus.png)](https://david-dm.org/mrzmyr/angular-google-plus) 
[![Dev Dependency Status](https://david-dm.org/mrzmyr/angular-google-plus/dev-status.png)](https://david-dm.org/mrzmyr/angular-google-plus#info=devDependencies&view=table) 

> A angular module which handles the login with the Google+ API

#### Demo

Try [this demo](http://plnkr.co/edit/jvHVtNedJoPcqRKg8OLz?p=preview). _Remind that there is no `API Key` and `Client ID` inserted_


#### Install

Install the angular module with bower.

```
$ bower install angular-google-plus
```

#### Usage

```
var app = angular.module('app', ['googleplus']);

app.config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: 'YOUR_CLIENT_ID',
        apiKey: 'YOUR_API_KEY'
     });
}]);

app.controller('AuthCtrl', ['$scope', 'GooglePlus', function ($scope, GooglePlus) {
    $scope.login = function () {
        GooglePlus.login().then(function (authResult) {
            console.log(authResult);

            GooglePlus.getUser().then(function (user) {
                console.log(user);
            });
        }, function (err) {
            console.log(err);
        });
    };
}]);
```

#### Credits

- Insperation from [jakemmarsh's gist](https://gist.github.com/jakemmarsh/5809963)
