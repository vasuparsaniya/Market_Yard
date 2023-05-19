'use strict';
var app = angular.module('app', []);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.controller('UserListCtrl', ['$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
// ...
var serverUrl = 'http://localhost:8080';
var insertUrl = serverUrl + '/insertUser';
var updateUrl = serverUrl + '/updateUser';
var getUrl = serverUrl + '/getUsers';
var removeUrl = serverUrl + '/removeUser';


var insertMethod = 'POST';
var updateMethod = 'PUT';
var removeMethod = 'DELETE';


$scope.roles = ['Farmer', 'Retailer', 'Wholesaler'];
$scope.crops = ['Ragi', 'Wheat', 'Rice', 'Jowar', 'Bajra', 'Pulses'];

$scope.save = function () {
    var formData = {
        name: this.name,
        role: this.role,
        gender: this.gender,
        crop: this.crop,
        date: this.date,
        phone: this.phone,
        email: this.email
    };
    this.name = '';
    this.role = '';
    this.gender = '';
    this.crop = '';
    this.date = '';
    this.phone = '';
    this.email = '';

    $http({
        method: insertMethod,
        url: insertUrl,
        data: formData, // Send data in the request body as JSON
        headers: { 'Content-Type': 'application/json' }
    })
        .success(function (response) {
            console.log("Successfully register....")
            // $scope.list();
        })
        .error(function (error) {
            console.log(error);
        });

    return false;
};

// $scope.update = function(user) {
//     var userData = {
//       username: user.username,
//       password: user.password,
//       email: user.email,
//       _id: user._id
//     };

//     $http({
//       method: updateMethod,
//       url: updateUrl,
//       data: userData,
//       headers: { 'Content-Type': 'application/json' }
//     })
//     .success(function(response) {
//       $scope.list();
//     })
//     .error(function(error) {
//       console.log(error);
//     });

//     return false;
//   };


// $scope.remove = function() {
//   var userData = {
//     username: this.user.username,
//     password: this.user.password,
//     email: this.user.email
//   };

//   $http({
//     method: removeMethod,
//     url: removeUrl,
//     data: userData, // Send data in the request body as JSON
//     headers: { 'Content-Type': 'application/json' }
//   })
//   .success(function(response) {
//     $scope.list();
// })
// .error(function(error) {
//     console.log(error);
// });

//   return false;
// };

// $scope.list = function() {
//     $http.get(getUrl)
//         .success(function(data) {
//             $scope.users = data;
//         })
//         .error(function(error) {
//             console.log(error);
//         });
// };
}]);



app.controller('LoginSignup', ['$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
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
}]);


// function UserListCtrl($scope, $http, $templateCache) {

//     // ...
//     var serverUrl = 'http://localhost:8080';
//     var insertUrl = serverUrl + '/insertUser';
//     var updateUrl = serverUrl + '/updateUser';
//     var getUrl = serverUrl + '/getUsers';
//     var removeUrl = serverUrl + '/removeUser';


//     var insertMethod = 'POST';
//     var updateMethod = 'PUT';
//     var removeMethod = 'DELETE';


//     $scope.roles = ['Farmer', 'Retailer', 'Wholesaler'];
//     $scope.crops = ['Ragi', 'Wheat', 'Rice', 'Jowar', 'Bajra', 'Pulses'];

//     $scope.save = function () {
//         var formData = {
//             name: this.name,
//             role: this.role,
//             gender: this.gender,
//             crop: this.crop,
//             date: this.date,
//             phone: this.phone,
//             email: this.email
//         };
//         this.name = '';
//         this.role = '';
//         this.gender = '';
//         this.crop = '';
//         this.date = '';
//         this.phone = '';
//         this.email = '';

//         $http({
//             method: insertMethod,
//             url: insertUrl,
//             data: formData, // Send data in the request body as JSON
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .success(function (response) {
//                 console.log("Successfully register....")
//                 // $scope.list();
//             })
//             .error(function (error) {
//                 console.log(error);
//             });

//         return false;
//     };

//     // $scope.update = function(user) {
//     //     var userData = {
//     //       username: user.username,
//     //       password: user.password,
//     //       email: user.email,
//     //       _id: user._id
//     //     };

//     //     $http({
//     //       method: updateMethod,
//     //       url: updateUrl,
//     //       data: userData,
//     //       headers: { 'Content-Type': 'application/json' }
//     //     })
//     //     .success(function(response) {
//     //       $scope.list();
//     //     })
//     //     .error(function(error) {
//     //       console.log(error);
//     //     });

//     //     return false;
//     //   };


//     // $scope.remove = function() {
//     //   var userData = {
//     //     username: this.user.username,
//     //     password: this.user.password,
//     //     email: this.user.email
//     //   };

//     //   $http({
//     //     method: removeMethod,
//     //     url: removeUrl,
//     //     data: userData, // Send data in the request body as JSON
//     //     headers: { 'Content-Type': 'application/json' }
//     //   })
//     //   .success(function(response) {
//     //     $scope.list();
//     // })
//     // .error(function(error) {
//     //     console.log(error);
//     // });

//     //   return false;
//     // };

//     // $scope.list = function() {
//     //     $http.get(getUrl)
//     //         .success(function(data) {
//     //             $scope.users = data;
//     //         })
//     //         .error(function(error) {
//     //             console.log(error);
//     //         });
//     // };
//     // // ...
// }




// function LoginSignup($scope, $http, $templateCache) {

//     // ...
//     var serverUrl = 'http://localhost:8080';
//     var loginUrl = serverUrl + '/login';
//     var signupUrl = serverUrl + '/signup';
//     var forgotpasswordUrl = serverUrl + '/forgotpassword';


//     var insertMethod = 'POST';
//     var updateMethod = 'PUT';

//     $scope.login = function () {
//         var formData = {
//             email: this.email,
//             password: this.password
//         };
//         this.email = '';
//         this.password = '';

//         $http({
//             method: insertMethod,
//             url: loginUrl,
//             data: formData, // Send data in the request body as JSON
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .success(function (response) {
//                 console.log("Login.....");
//             })
//             .error(function (error) {
//                 console.log(error);
//             });

//         return false;
//     };

//     $scope.signup = function () {
//         var formData1 = {
//             email: this.email,
//             password: this.password,
//             confirmpassword: this.confirmpassword
//         };
//         this.email = '';
//         this.password = '';
//         this.confirmpassword = '';


//         $http({
//             method: insertMethod,
//             url: signupUrl,
//             data: formData1, // Send data in the request body as JSON
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .success(function (response) {
//                 console.log("Signup.....");
//             })
//             .error(function (error) {
//                 console.log(error);
//             });

//         return false;
//     };
// }

