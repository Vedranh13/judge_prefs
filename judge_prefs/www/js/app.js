// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    starter.initializeApp({
        serviceAccount: {
            projectId: "judge-prefs",
            clientEmail: "fb-data@judge-prefs.iam.gserviceaccount.com",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1yMqDaqKVVxIg\nw5bX4uBUok3aNvvFDGn8nzf5R3I6BSHAPIhGYu8EsIhjvW63++V/jQctJjND80u3\n2T/RLJA4e7DqRZ+AfaV/vMjl36S++QgdraRgDxCDNcYknY7OQx5ov3UoFRa+AMM9\nnj3sZlpLVQNcfLdGexlulb0ix7b+wOfc0QXBirkesv5dnznIE6QsJl3KX/i38a+U\nKC0n65aId366DhfP7g4oGodEQDjbZ/5Fh1RwyX8LY07RhLK1+yDoyzOyZjD+tjFj\nZKFXbvWaJanJz7JQ3wQoNPixYdPu/fyOrmoubtqBGarafeAAmL/LD/3L49alA7iT\nkIJCQA6zAgMBAAECggEAHFvmu/m2w3WB7nqU3bkXJhzr6E8LmAIHxtFP+iObPlHu\nof7Pg6uLfj/MB0NWMn2pn+xwYirDdKZP+a56tjctiKJDR0j1SSZQ20yoSrRJD0Hq\ncjbUnee7u7x33N53mNX/uHel30rq8VlNHB/DqU2OaJIqpBMQxH4PyaCykOp3MebC\n2UzQpGX9XKw+/X887dyfnsofh7h23r2ZfXbWEWGJLejw6eqaSlmzXj9Znjz+7dcQ\nWjGKXLwf3tU0ouB441M17q6jDQwAqpDiUG3A8c2BekXdYVrDns7eyb3ad8fm94Ae\niWA33hjUmFeb1c5eYNPsRQ6WZiCYD2gZMgVB0SYWAQKBgQDkm/RG84GHKVJJYXli\nkSq/DSzNk48FXUyC5dDaBm9Vp87XwtBpQE4VrXEDIWZy/ndFfCbCpKRQb/vjmtTj\n6WmLWCf/jsFfC7WN9L36SnrGSgXV26xNL2LVV31cdf0wyL22JBkQiuBmI4HnIp5a\nqI9CAcviwnQ/c/S+ika3ZMqOwwKBgQDLkJhj1RTE6+w7wH+4cFxWnO2WLWbR6/Xl\nF7KUOiI/sIfUkMr/XQvLz4bdiT7NNCBxCwhRVwACQ4ovt/YF/YrxQs052yd7P+JE\n2gRdWLYBcmTxy+GRXFCTKCNF9NLXPumWtFRq6HJX5ExXnS0jNe0enOziB6iGXYYl\n2g2aOpthUQKBgQDcLLOs7fOPSKXe1MlCvEtuK/M9n2M8qGn7G/n1MgNifLcDKLbu\n16ccy6mveSihkiEvQ+5UwpsaeXAg+ssVIoWrVeFYCZaFwtI+ATxDZh4vAbXzDZo5\n0Gygyp2LQnvy0zOby9J0Ez0iQgpnoPjgmb03tmE2aU/qmPRb2vNWx/UqXwKBgQDG\nhtdIDah6wIecYoltLA+x3MwM+WxccF5YtbrQur1qFdTypt+DGpCFjXg/GDmqURsO\nhC7xfQKiMpJTJXsHrpTR5E9YDHa9ybj3YxR8oSan1JPECQ2NAVYHnk6ATFtP1qhi\n9K2bseTJ+PnHPJ+nxlDh2TNg4Q0nNZC926IGdv/QcQKBgHLEQjETyhKe07DIEyvN\nY+A8Ua+M7t0Y3+kunirioznaghfZSppQXwUp4hmLXug5fLIPsroQaG5SJyRx5cku\n5IbpE0789kiLYkvDWMp6x8Qbht3oBlNg1Kr8/RJ0aTNpuQklddtGWdFhheokRwg7\nCdMqsbQDA0wbkrT8x6AHXba+\n-----END PRIVATE KEY-----\n"
            },
            databaseURL:"https://judge-prefs.firebaseio.com"
        });
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('rr-t', {
    url: '/rr-t',
    views: {
      'rr-t': {
        templateUrl: 'templates/tab-rr.html',
        controller: 'rrCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.rr', {
    url: '/rr',
    views: {
      'tab-rr': {
        templateUrl: 'templates/tab-rr.html',
        controller: 'rrCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'searchCtrl'
        }
      }
    })



  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})
//adding the Authentication object which should allow us to authenticate users 
.controller("MyAuthCtrl", ["$scope","$firebaseAuth",
 function($scope,$firebaseAuth){
  var ref = new Firebase("https://judge-prefs.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);
 }
]);
