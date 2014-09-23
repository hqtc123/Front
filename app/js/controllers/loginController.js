/**
 * Created by simu-hq on 2014/9/23.
 */

jinJuControllers.controller('loginController', ['$scope', '$location',
    function ($scope, $location) {
//        $scope.phoneId = $routeParams.phoneId;
        if (GlobalConstants.user !== null) {
            $location.path("/home");
        }
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
