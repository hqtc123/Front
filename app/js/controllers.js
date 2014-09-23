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
function showWarnMessage(ele, message) {
    ele.notify(message, {
        position: "right",
        autoHideDelay: 2000,
        className: "warn"
    });
}
/* Controllers */

var jinJuControllers = angular.module('jinJuControllers', []);

jinJuControllers.controller('signUpController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.submit2 = function () {
            $scope.description = "";
            if (!isEmail($scope.email)) {
                showWarnMessage($("#inputEmail"), "邮箱格式不正确");
                return false;
            }
            if (!isValidPassword($scope.password)) {
                showWarnMessage($("#inputPassword"), "密码应该是6-10位字母或数字");
                return false;
            }
            if ($scope.description.length > 100) {
                showWarnMessage($("#inputDescription"), "长度不能超过 100 字啊");
                return false;
            }
            var data = {
                email: $scope.email,
                password: $scope.password,
                nick: $scope.nick,
                description: $scope.description
            }
            // 在 angular 中 每当有 异步执行的 可能改变界面 的 方法 应该用 apply wrap 起来
            apiPost("/user/register", data, function (rs) {
                if (rs.code == 0) {
                    GlobalConstants.user = rs.data;
                    $scope.$apply($location.path("/home"));
                }
            })
        }
    }]);

jinJuControllers.controller('loginController', ['$scope', '$location',
    function ($scope, $location) {
//        $scope.phoneId = $routeParams.phoneId;
        $scope.submit2 = function () {
            if (!isEmail($scope.email)) {
                showWarnMessage($("#inputEmail"), "邮箱格式不正确");
                return false;
            }

            var data = {
                email: $scope.email,
                password: $scope.password

            }
            // 在 angular 中 每当有 异步执行的 可能改变界面 的 方法 应该用 apply wrap 起来
            apiPost("/user/login", data, function (rs) {
                if (rs.code == 0) {
                    GlobalConstants.user = rs.data;
                    $scope.$apply($location.path("/home"));
                }
            })
        }
    }]);

jinJuControllers.controller('homeController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.user = GlobalConstants.user;
        if ($scope.user == null) {
            $scope.header = {
                path: "partials/guest_header.html"
            }
        } else {
            $scope.header = {
                path: "partials/header.html"
            };
            $scope.getEmail = function () {
                apiPost("/user/email", function (rs) {
                    alert(rs.data);
                    $scope.$apply();
                })
            };
            $scope.logout = function () {
                apiPost("/user/logout", function (rs) {
                    if (rs.code == 0) {
                        $scope.$apply($location.path("/login"));
                    }
                })
            }
        }
    }]);
