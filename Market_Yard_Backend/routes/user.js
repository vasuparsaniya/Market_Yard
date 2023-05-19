'use strict';
var app = angular.module('app', []);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.controller('LoginSignup', ['$scope', '$http', '$templateCache', function ($scope, $http, $templateCache) {
    // ...
    var serverUrl = 'http://localhost:8080';
    var loginUrl = serverUrl + '/login';
    var signupUrl = serverUrl + '/signup';
    var forgotpasswordUrl = serverUrl + '/forgotpassword';


    var insertMethod = 'POST';
    var updateMethod = 'PUT';

    $scope.login = function () {
        var formData = {
            email: this.email,
            password: this.password
        };
        this.email = '';
        this.password = '';

        $http({
            method: insertMethod,
            url: loginUrl,
            data: formData, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (response) {
                console.log("Login.....");
            })
            .error(function (error) {
                console.log(error);
            });

        return false;
    };

    $scope.signup = function () {
        var formData1 = {
            email: this.email,
            password: this.password,
            confirmpassword: this.confirmpassword
        };
        this.email = '';
        this.password = '';
        this.confirmpassword = '';


        $http({
            method: insertMethod,
            url: signupUrl,
            data: formData1, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (response) {
                console.log("Signup.....");
            })
            .error(function (error) {
                console.log(error);
            });
        return false;
    };


    $scope.forgotpassword = function () {
        var formData1 = {
            email: this.email,
            password: this.password,
            confirmpassword: this.confirmpassword
        };
        this.email = '';
        this.password = '';
        this.confirmpassword = '';


        $http({
            method: insertMethod,
            url: signupUrl,
            data: formData1, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (response) {
                console.log("Signup.....");
            })
            .error(function (error) {
                console.log(error);
            });
        return false;
    };
}]);
