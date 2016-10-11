// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])
.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "homeCtrl"
      })

  .state('submitRoundReport', {
        url: "/submitRoundReport",
        templateUrl: "templates/submitRoundReport.html",
        controller: "submitRoundReportCtrl"
      })

  .state('rr-t', {
        url: "/rr-t",
        templateUrl: "templates/rr-t.html",
        controller: "rr-Ctrl"
      })

  .state('rr-k', {
        url: "/rr-k",
        templateUrl: "templates/rr-k.html",
        controller: "rr-Ctrl"
      })

  .state('rr-cp', {
        url: "/rr-cp",
        templateUrl: "templates/rr-cp.html",
        controller: "rr-Ctrl"
      })

  .state('rr-da', {
        url: "/rr-da",
        templateUrl: "templates/rr-da.html",
        controller: "rr-Ctrl"
      })

  .state('search', {
        url: "/search",
        templateUrl: "templates/search.html",
        controller: "searchCtrl"
      })

  .state('searchresults', {
        url: "/searchresults",
        templateUrl: "templates/searchresults.html",
        controller: "searchresultsCtrl"
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
