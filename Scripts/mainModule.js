(function () {

    "use strict";

    var mainModule = angular.module("mainModuledfsdgdgs", []);

    mainModule.controller("registerController", function ($scope, $http) {
        $scope.formInfo = {};
        var newUser = {};
        $scope.usernameError = "";
        $scope.nameError = "";
        $scope.passwordError = "";
        $scope.passowrdMatch = "";
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        function clearFields() {
            $scope.formInfo.name = '';
            $scope.formInfo.username = '';
            $scope.formInfo.email = '';
            $scope.formInfo.password = '';
            $scope.formInfo.repassword = '';
            $scope.registerAlert = '';
        }

        $scope.validateAndSend = function () { 
            var isOkay = true;

            if ($scope.formInfo.name == "" || $scope.formInfo.name == undefined) {
                $scope.nameError = "Name is required ";
                isOkay = false;

            } else { $scope.nameError = ""; }
            if ($scope.formInfo.username == "" || $scope.formInfo.username == undefined) {
                $scope.usernameError = "username is required";
                isOkay = false;

            } else { $scope.usernameError = ""; }
            if (!(validateEmail($scope.formInfo.email))) {
                $scope.emailError = "Email is invalid";
                isOkay = false;
            } else { $scope.emailError = ""; }

            if (!($scope.formInfo.repassword === $scope.formInfo.password) || $scope.formInfo.password == undefined) {
                $scope.passwordMatch = "Passwords do not match";
                isOkay = false;
            } else { $scope.passwordMatch = ""; }


            if (isOkay) {
                $http.post('/register', JSON.stringify($scope.formInfo)).then("Data submitted to server", "Error submitting to server");
                clearFields();
                $scope.registerAlert = 'CONGRATULATIONS! YOU REGISTERED SUCCESSFULLY';
            }

            else {$scope.registerAlert = "Failed to Register. Check errors above fields." };
        };

    })


    mainModule.controller("loginController", function ($scope, $http, $location) {

        $scope.log= {};
        $scope.loginUser = function () {
            var allUsers = {};
            var email = $scope.log.email;
            var password = $scope.log.password;
            var username = "";
            var match = false;

        $scope.loginUser = function () {

            $http.get("/login")
                .then(function (response) {
                    console.log(response);
                    allUsers = response.data;
                });

                for (var i = 0; i < allUsers.length; i++) {

                    if (allUsers[i].password == password && allUsers[i].email == email) {
                        match = true;
                        username = allUsers[i].username;
                        break;
                    }
                }

                if (match) {
                    alert("Login successful");
                    $location.path("/dashboard/" + username);
                }
                else {
                    alert('Uh-uh.. User does not exist');
                }

            }

        };

        $scope.clearForm = function () {

            $scope.login.email = "";
            $scope.login.password = "";
        };

    })
})();