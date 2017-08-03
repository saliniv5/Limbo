(function () {

    "use strict";

    var addVideoModule = angular.module('PopupDemo', ['ui.bootstrap']);
    angular.module('PopupDemo').controller('PopupDemoCont', ['$scope', '$modal', function ($scope, $modal) {
        $scope.open = function () {
            console.log('opening pop up');
            var modalInstance = $modal.open({
                templateUrl: 'addVideoPopup.html',
                controller: 'PopupCont',
            });
        }
    }]);
    angular.module('PopupDemo').controller('PopupCont', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
})();

