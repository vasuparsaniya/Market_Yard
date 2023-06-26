'use strict';
var app = angular.module('app', []);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.controller('UserListCtrl', ['$scope', '$http', '$templateCache', '$window', function ($scope, $http, $templateCache, $window, $location) {
    // ...
    var serverUrl = 'http://localhost:8080';
    var insertFarmerUrl = serverUrl + '/insertFarmer';
    var insertRetailerUrl = serverUrl + '/insertRetailer';
    var insertBookSlotUrl = serverUrl + '/insertBookSlot';
    var getUrl = serverUrl + '/getReatiler';
    var getNewUrl = serverUrl + '/getRetailer/';

    var loginUrl = serverUrl + '/login';
    var signupUrl = serverUrl + '/signup';
    var forgotpasswordUrl = serverUrl + '/forgotpassword';

    var insertMethod = 'POST';
    var getMethod = 'GET';
    var updateMethod = 'PUT';


    $scope.roles = ['Farmer', 'Retailer'];
    $scope.crops = ['Ragi', 'Wheat', 'Rice', 'Jowar', 'Bajra', 'Pulses'];

    $scope.farmer = function () {
        var formData = {
            name: this.name,
            role: 'Farmer',
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
            url: insertFarmerUrl,
            data: formData, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (response) {
                console.log("Farmer Successfully register....")
                var message = "Farmer Successfully register....";
                alert(message);
                $window.location.assign('data.html'); // Redirect to data.html
                // $scope.list();
            })
            .error(function (error) {
                console.log(error);
            });

        return false;
    };

    $scope.retailer = function () {
        var formData = {
            name: this.name,
            role: 'Retailer',
            price: this.price,
            gender: this.gender,
            crop: this.crop,
            date: this.date,
            phone: this.phone,
            address: this.address,
            email: this.email
        };
        this.name = '';
        this.role = '';
        this.price = '';
        this.gender = '';
        this.crop = '';
        this.date = '';
        this.phone = '';
        this.address = '';
        this.email = '';

        $http({
            method: insertMethod,
            url: insertRetailerUrl,
            data: formData, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (response) {
                console.log("Retailer Successfully register....")

                var message = "Retailer Successfully register....";
                alert(message);
                $window.location.assign('index.html'); // Redirect to data.html
                // $scope.list();
            })
            .error(function (error) {
                console.log(error);
            });

        return false;
    };

    $scope.list = function () {
        $http.get(getUrl)
            .success(function (data) {
                $scope.retailer = data;
            })
            .error(function (error) {
                console.log(error);
            });
    };

    // $scope.list1 = function() {
    //     $http.get(getUrl)
    //       .success(function(response) {
    //         // Assuming the response data is in the following format:
    //         // response.data = {
    //         //   retailerName: "Retailer Name",
    //         //   currentAddress: "Current Address"
    //         // }

    //         // Populate the retailer name and current address in the form
    //         $scope.retailerName = response.data.name;
    //         $scope.retailerPhone = response.data.phone;
    //         $scope.crop = response.data.crop;
    //         $scope.date= response.data.date;
    //         $scope.currentAddress = response.data.address;
    //       })
    //       .error(function(error) {
    //         console.log(error);
    //       });
    //   };



    //-----------old---------
    // $scope.getRetailerData = function() {
    //     var searchParams = new URLSearchParams(window.location.search);
    //     var userId = searchParams.get('user_id');

    //     $http.get(getNewUrl + userId)
    //       .success(function(response) {
    //         if (response.data && response.data.date) {
    //           $scope.date = response.data.date;
    //           $scope.retailerName = response.data.name;
    //           $scope.retailerPhone = response.data.phone;
    //           $scope.crop = response.data.crop;
    //           $scope.address = response.data.address;
    //         } else {
    //           console.log('Invalid retailer data:', response.data);
    //           console.log(response.data);
    //         }
    //       })
    //       .error(function(error) {
    //         console.log('Error fetching retailer data:', error);
    //       });
    // };

    $scope.getRetailerData = function () {
        var searchParams = new URLSearchParams(window.location.search);
        var retailerId = searchParams.get('user_id');

        $http.get(getNewUrl + retailerId)
            .success(function (response) {
                if (response.date) {
                    $scope.date = response.date;
                    $scope.retailerName = response.name;
                    $scope.retailerPhone = response.phone;
                    $scope.crop = response.crop;
                    $scope.address = response.address;
                } else {
                    console.log('Invalid retailer data:', response);
                }
            })
            .error(function (error) {
                console.log('Error fetching retailer data:', error);
            });
    };

    $scope.getQueryParam = function (param) {
        var searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(param);
    };


    $scope.getQueryParam = function (param) {
        var searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(param);
    };


    //---------------------------------------------------------------------------------------------
    $scope.bookSlot = function () {
        var formData = {
            farmerName: this.farmerName,
            gender: this.gender,
            farmerPhone: this.farmerPhone,
            farmerEmail: this.farmerEmail,
            slotTime: this.slotTime,
            date: this.date,
            retailerName: this.retailerName,
            retailerPhone: this.retailerPhone,
            crop: this.crop,
            retailerPhone: this.retailerPhone,
            address: this.address
        };
        this.farmerName = '';
        this.gender = '';
        this.farmerPhone = '';
        this.farmerEmail = '';
        this.slotTime = '';
        this.date = '';
        this.retailerName = '';
        this.retailerPhone = '';
        this.crop = '';
        this.retailerPhone = '';
        this.address = '';

        console.log("------");
        $http({
            method: insertMethod,
            url: insertBookSlotUrl,
            data: formData, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
        .success(function (response) {
                console.log("Slot Book Successfully....");
                var message = "Slot Book Successfully....";
                alert(response.message);
                // alert(response.message);

                $window.location.href = 'index.html'; // Redirect to index.html
                // $scope.list();

                // Trigger the download
                //   var link = document.createElement('a');
                //   link.href = "data:application/pdf;base64," + response;
                //   link.download = 'generated_pdf.pdf';
                //   link.click();

                // var blob = new Blob([response.data], { type: 'application/pdf' });
                // saveAs(blob, 'generated_pdf.pdf');
            })
            .error(function (error) {
                console.log(error);
            });
        return false;
    };


    // $scope.bookSlot = function () {
    //     var formData = {
    //       farmerName: this.farmerName,
    //       gender: this.gender,
    //       farmerPhone: this.farmerPhone,
    //       farmerEmail: this.farmerEmail,
    //       slotTime: this.slotTime,
    //       date: this.date,
    //       retailerName: this.retailerName,
    //       retailerPhone: this.retailerPhone,
    //       crop: this.crop,
    //       retailerPhone: this.retailerPhone,
    //       address: this.address
    //     };

    //     // Clear form fields
    //     this.farmerName = '';
    //     this.gender = '';
    //     this.farmerPhone = '';
    //     this.farmerEmail = '';
    //     this.slotTime = '';
    //     this.date = '';
    //     this.retailerName = '';
    //     this.retailerPhone = '';
    //     this.crop = '';
    //     this.retailerPhone = '';
    //     this.address = '';

    //     $http({
    //       method: insertMethod,
    //       url: insertBookSlotUrl,
    //       data: formData,
    //       headers: { 'Content-Type': 'application/json' },
    //       responseType: 'arraybuffer' // Specify the response type as arraybuffer
    //     })
    //     .success(function (response) {
    //         var message = "Slot Book Successfully....";
    //         alert(message);
    //         var blob = new Blob([response.data], { type: 'application/pdf' });

    //         // Create a temporary URL for the PDF file
    //         var url = window.URL.createObjectURL(blob);

    //         // Create a link element and simulate a click to trigger the download
    //         var link = document.createElement('a');
    //         link.href = url;
    //         link.download = 'generated_pdf.pdf';
    //         link.click();

    //         // Clean up the temporary URL after the download
    //         window.URL.revokeObjectURL(url);
    //       })
    //       .error(function (error) {
    //         console.log(error);
    //       });


    //     return false;
    //   };


    //=====================================
    
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
                console.log("Login Successfully....")
                var message = "Login Successfully....";
                alert(message);
                $window.location.assign('index.html'); // Redirect to index.html
            })
            .error(function (error) {
                // console.log(error);
                alert("User not found");
            });
        return false;
    };
    
    $scope.passwordMatch = true;

    $scope.checkPasswordMatch = function () {
        $scope.passwordMatch = $scope.confirmpassword === $scope.password;
    };
    
    $scope.signup = function () {

        var formData = {
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
            data: formData, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (response) {
                console.log("SignUp Successfully....")
                var message = "SignUp Successfully....";
                alert(message)
                $window.location.assign('login.html'); // Redirect to login.html   
             })
            .error(function (error) {
                if (error.status === 400) {
                    alert("Email Already Exists. Please try again with a different email.");
                } else {
                    alert("Email Already Exists");
                }
                console.log(error);
            });
        return false;
    };

    
    $scope.forgotpassword = function () {
        var formData = {
            email: this.email
        };
        this.email = '';


        $http({
            method: insertMethod,
            url: forgotpasswordUrl,
            data: formData, // Send data in the request body as JSON
            headers: { 'Content-Type': 'application/json' }
        })
            .success(function (response) {
                console.log("Password Send Successfully to your Email....")
                var message = "Password Send Successfully to your Email....";
                alert(message)
                $window.location.assign('login.html'); // Redirect to login.html   
             })
            .error(function (error) {
                if (error.status === 400) {
                    alert("Email Already Exists. Please try again with a different email.");
                } else {
                    alert("Something Went Wrong");
                }
                console.log(error);
            });
        return false;
    };


}]);



// app.controller('LoginSignup', ['$scope', '$http', '$templateCache', function ($scope, $http, $templateCache) {
//     // ...

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
//                 console.log("SignUp Successfully....")
//                 var message = "SignUp Successfully....";
//                 alert(message);
//                 $window.location.assign('login.html'); // Redirect to data.html   
//              })
//             .error(function (error) {
//                 console.log(error);
//             });
//         return false;
//     };
// }]);