'use strict';

/* App Module */

var jinJuApp = angular.module('JinJu', [
    'ngRoute',
    'jinJuControllers'
]);

jinJuApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/signup', {
                templateUrl: 'partials/signup.html',
                controller: 'signUpController'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'loginController'
            }).
            when("/home", {
                templateUrl: 'partials/home.html',
                controller: "homeController"
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

var GlobalConstants = {
    serverRoot: "http://localhost:8080",
    user: null
}