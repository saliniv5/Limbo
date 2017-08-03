(function () {

    "use strict";

    var productsModule = angular.module("productsModule", []);

    productsModule.controller("ProductsController", function ($scope, $http) {

        $http.get("/getAllProducts")
            .then(function (response) {
                $scope.products = response.data;
            })
            .catch(function (err) {
                alert(err);
            });



        $scope.addNewProduct = function (newProduct) {

            //    $scope.content = JSON.parse(newProduct);

            $scope.newProduct = {};

            $http.post('/addProduct/' + newProduct.productName + '/' + newProduct.unitPrice + '/' + newProduct.unitInStock + '/' + newProduct.unitsOnOrder).then(successCallback, errorCallback)



        };

        productsModule.controller("ProductDetailsController", function ($scope, $http, $routeParams) {

            // $routeParams = Service which can extract the route parameters

            $http.get("/getOneProduct/" + $routeParams.id)
                .then(function (response) {

                    $scope.product = response.data;

                })
                .catch(function (err) {
                    alert(err);
                });

        });

        productsModule.directive("ngProductLogo", function () {

            return {

                template: '<img src="/Images/product.png"></img>'

            };
        });

    })

})();