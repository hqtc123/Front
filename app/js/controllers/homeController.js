/**
 * Created by simu-hq on 2014/9/23.
 */

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
                apiPost("/user/current", function (rs) {
                    alert(rs.data.email);
                    $scope.$apply();
                })
            };
            $scope.logout = function () {
                apiPost("/user/logout", function (rs) {
                    if (rs.code == 0) {
                        GlobalConstants.user = null;
                        $scope.$apply($location.path("/login"));
                    }
                })
            }
        }
    }]);
