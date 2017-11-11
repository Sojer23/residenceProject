angular.module("ManagerApp",["ngRoute"]).config(function($routeProvider){
    
    
    $routeProvider
    .when("/",{
        templateUrl:"/principal.html"
        //We don't need any controller here since this is a static page
    })

    .when("/about",{
        templateUrl:"/about.html"
        //We don't need any controller here since this is a static page
    })
    
    .when("/menu",{
        templateUrl:"/angularCtrls/menu.html",
        controller: "MenuCtrl"
    })
    
    .when("/info",{
        templateUrl: "/angularCtrls/info.html",
        controller: "InfoCtrl"
    })
    .when("/transport",{
        templateUrl: "/angularCtrls/transport.html",
        controller: "TransportCtrl"
    })

    console.log("App initialized");

});