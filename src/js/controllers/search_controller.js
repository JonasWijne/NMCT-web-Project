app.controller('search', function ($scope, $log, PubSub) {


    $scope.search = function () {
        if ($scope.search_input) {
            $log.info("searching for : " + $scope.search_input);
            PubSub.publish('search', {text: $scope.search_input});

        }
    }


});