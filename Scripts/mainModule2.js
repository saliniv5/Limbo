(function () {

    "use strict";

    var mainModule = angular.module("mainModule", []);

    mainModule.controller("homeController", function ($rootScope) {
        var myLimboButton = $("#myLimboButton");
        var logButton = $("#logButton");
        if (sessionStorage.getItem('user') != null) {
            logButton.attr("href", "#!/logout");
            logButton.attr("title", "Logout");
            logButton.attr("data-target", "logout.html");
            logButton.text("Logout");
            myLimboButton.attr("href", "#!/dashboard");
            myLimboButton.attr("data-target", "dashboard.html");
        };


    })

    mainModule.controller("registerController", function ($scope, $http) {
        var comma = ',';
        $scope.formInfo = {};
        $scope.repassword = "";
        var newUser = {};
        $scope.usernameError = "";
        $scope.nameError = "";
        $scope.passwordError = "";
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        function clearFields() {
            $scope.formInfo.name = '';
            $scope.formInfo.username = '';
            $scope.formInfo.email = '';
            $scope.formInfo.password = '';
            $scope.repassword = '';
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

            if (!($scope.repassword === $scope.formInfo.password) || $scope.formInfo.password == undefined) {
                $scope.passwordMatch = "Passwords do not match";
                isOkay = false;
            } else { $scope.passwordMatch = ""; }


            if (isOkay) {
                $http.post('/register', JSON.stringify($scope.formInfo)).then("Data submitted to server", "Error submitting to server");
                clearFields();
                $scope.registerAlert = 'CONGRATULATIONS! YOU REGISTERED SUCCESSFULLY';
                $location.path("/login");
            }

            else { $scope.registerAlert = "Failed to Register. Check errors above fields." };
        };

    })


    mainModule.controller('loginController', function ($scope, $location, $http, LoginService) {
        $scope.log = {};
        $scope.loginUser = function () {
            $http.get("/login")
                .then(function (response) {
                    console.log(response.data);
                    if (LoginService.login(response.data, $scope.log.username, $scope.log.password)) {
                        $scope.loginAlert = '';
                        $scope.log.password = '';
                        $scope.loginAlert = "Login successful";
                        //$window.location("/dashboard/" + scope.log.username);
                        //$location.path("/dashboard/" + scope.log.username);
                        sessionStorage.setItem("user", $scope.log.username);
                        $location.path("/dashboard/" + $scope.log.username);


                    } else {
                        $scope.loginAlert = "Incorrect username/password !";
                    }
                });
        };

        $scope.clearForm = function () {

            $scope.log.username = "";
            $scope.log.password = "";
        };

    });

    mainModule.factory('LoginService', function () {
        var isAuthenticated = false;
        return {
            login: function (allUsers, username, password) {
                for (var i = 0; i < allUsers.length; i++) {
                    isAuthenticated = username === allUsers[i].username && password === allUsers[i].password;
                    if (isAuthenticated) {
                        break;
                    }
                }
                return isAuthenticated;
            },
            isAuthenticated: function () {
                return isAuthenticated;
            },
        };

    })

    mainModule.controller('dashboardController', function ($scope, $http, $routeParams, $location) {

        var logButton = $("#logButton");
        if (sessionStorage.getItem('user') != null) {
            logButton.attr("href", "/logout");
            logButton.attr("title", "Logout");
            logButton.attr("data-target", "logout.html");
            logButton.text("Logout");
        }
        else {
            $location.path('/login');
        }
        $scope.noVideosAlert = "";
        $scope.username = sessionStorage.getItem('user');
        var username = sessionStorage.getItem('user');
        var buildPlaylist = function () {

            $http.get("/dashboard/:username")
                .then(function (response) {
                    var div1 = $("<div>", { "class": "" });
                    var atLeastOneVideo = false;
                    if (response.data != null) {
                        for (var i = 0; i < response.data.length; i++) {
                            if (username == response.data[i].username) {
                                for (var j = 0; j < response.data[i].movies.length; j++) {
                                    var descP = "<p>" + 'Description: ' + response.data[i].movies[j].description + "</p>";
                                    var categoryP = "<p>" + "Category: " + response.data[i].movies[j].category + "</p>";
                                    var div2 = $("<div>", { "class": "col-xs-12 nopadding"});
                                    var delButton = $("<div>", { "class": "delete-button", "ng-click": "clearFromDB()", "movie-url": response.data[i].movies[j].link });
                                    $('.delete-button').html('X');
                                    $('.delete-button').click(function (event) {
                                        var url = $(this).attr('movie-url');
                                        console.log(this, event, url);
                                        event.preventDefault();
                                        $scope.clearFromDB(url,username);
                                        $(this).parent().remove();
                                    })
                                    var iframe = $("<iframe>", { "ng-src": response.data[i].movies[j].link, "height": 315, "width": 560, "allowFullScreen": true });
                                    div2.append(iframe);
                                    div2.append(delButton);
                                    div2.append(descP);
                                    div2.append(categoryP);
                                    div1.append(div2);
                                    $("#playlist").append(div2);


                                    atLeastOneVideo = true;

                                }
                            }

                        }
                    }
                    if (!atLeastOneVideo) {
                        $scope.noVideosAlert = "Add your first video";
                    }

                });
        }

        $scope.clearFromDB = function (url, username) {
            var endingURL = url.split('d/');
            $http.delete('/dashboard/' + username + '/' + endingURL[1])
                .then(
           function (response) {
               console.log("Successfully Removed Movie from DB");
           },
           function (response) {
               console.log("Failed to remove Movie from DB");
           }

        );

        };
        $scope.processForm = function () {
            console.log(JSON.stringify($scope.addForm));
            $scope.addForm.username = sessionStorage.getItem('user');
            $http.post('/dashboard/:username', JSON.stringify($scope.addForm), null, 2)
            .then(function () {
                console.log($scope.addForm);
                console.log("Video Added Successfully");
                location.reload();

            });
            $scope.showTheForm = false;
        }


        buildPlaylist();
    });

    mainModule.controller("log", function ($location, $rootScope, $scope) {
        $scope.username = sessionStorage.getItem("user");
        $scope.CheckIfAlreadyLogin = function () {
            var x = false;
            if (sessionStorage.getItem("user") != null) {
                x = false;
            }
            else {
                x = true;
            }
            return x;
        };
        $scope.CheckIfAlreadyLogout = function () {
            if (sessionStorage.getItem("user") != null) {
                return true;
            }
            else return false;
        };

        $scope.Logout = function () {

            sessionStorage.removeItem('user');
            $location.path('/home');
        }
    })
})();