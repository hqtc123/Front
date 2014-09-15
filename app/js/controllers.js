'use strict';
/* global function */
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}
function isValidPassword(str) {
    var reg = /^([a-zA-Z0-9]{6,10})$/;
    return reg.test(str);
}
/* Controllers */

var jinJuControllers = angular.module('jinJuControllers', []);

jinJuControllers.controller('signUpController', ['$scope',
    function ($scope) {
        $scope.submit2 = function () {
            if (!isEmail($scope.email)) {
                $("#inputEmail").notify("invalid email", {
                    position: "right",
                    autoHideDelay: 1000,
                    className: "warn"
                });
                return false;
            }
            if (!isValidPassword($scope.password)){
                $("#inputPassword").notify("invalid email", {
                    position: "right",
                    autoHideDelay: 1000,
                    className: "warn"
                });
                return false;
            }
        }
    }]);

jinJuControllers.controller('loginController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.phoneId = $routeParams.phoneId;
    }]);

jinJuControllers.controller('contentController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.phoneId = $routeParams.phoneId;
    }]);
