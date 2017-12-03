angular
    .module("ManagerApp")
    .controller("MenuCtrl", ["$scope", "$http", function ($scope, $http) {

        var dataCache = {};
        $scope.data = {};
        $scope.day = {};
        $scope.menu = {};
        $scope.hour;

        console.log("Controller Menu initialized");


        $http.get("/api/v1/menu").then(function (response) {
            dataCache = response.data;
            $scope.data = dataCache;
            var d = new Date();

            console.log(dataCache);

            $scope.day = {
                mon: dataCache[0],
                tue: dataCache[1],
                wed: dataCache[2],
                thu: dataCache[3],
                fri: dataCache[4]
            }
            //Monday
            if (d.getDay() == 0) {
                $scope.menu = $scope.day.mon;
            }
            //Tuesday
            if (d.getDay() == 2) {
                $scope.menu = $scope.day.tue;
            }
            //Wednesday
            if (d.getDay() == 3) {
                $scope.menu = $scope.day.wed;
            }
            //Thuesday
            if (d.getDay() == 4) {
                $scope.menu = $scope.day.thu;
            }
            //Friday
            if (d.getDay() == 5) {
                $scope.menu = $scope.day.fri;
            }


        });

    }]);