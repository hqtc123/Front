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
/* Controllers */
var jinJuControllers = angular.module('jinJuControllers', []);
//常量
var GlobalConstants = {
    serverRoot: "http://localhost:8080",
    user: null
};

//全局方法
var _ajax = function (url, data, type, callback) {
    jQuery.ajax({
        type: type,
        url: GlobalConstants.serverRoot + url,
        data: data,
        dataType: 'json',
        success: callback
    })
};

var apiPost = function (url, data, callback) {
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    _ajax(url, data, "post", callback);
};

var apiGet = function (url, data, callback) {
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    _ajax(url, data, "get", callback);
};

// warn message
var showWarnMessage = function (ele, message) {
    ele.notify(message, {
        position: "right",
        autoHideDelay: 2000,
        className: "warn"
    });
}