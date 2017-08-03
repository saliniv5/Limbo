(function () {

    "use strict";

    var appModule = angular.module("appModule", ["ngRoute", "mainModule",]);
 
    appModule.config(function ($routeProvider) {

        $routeProvider.when("/home", {
            templateUrl: "/HTML/home.html",
            controller: "homeController"

        })
        .when("/about", {
            templateUrl: "/HTML/about.html",
            controller: ""

        })
        .when("/register", {
            templateUrl: "/HTML/register.html",
            controller: "registerController"

        })
        .when("/login", {
            templateUrl: "/HTML/login.html",
            controller: "loginController"

        })
        .when("/dashboard/:username", {
            templateUrl: '/HTML/dashboard.html',
            controller: 'dashboardController'
        })
        .when("/logout", {
            templateUrl: '/HTML/logout.html',
            controller: 'logoutController'
        })
        
        .otherwise({
            redirectTo: "/home"
        });

    });


})();