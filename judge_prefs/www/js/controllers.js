angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('rrCtrl', function($scope) {})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('rrCtrl', function($scope) {
  $scope.rrNext = function() {

    // trad_aff = 1, k_aff = 2, no aff = 0
    $scope.aff_type = 0;

    if (judge.trad_aff) {
      $scope.aff_type = 1;
    }
    else if (judge.k_aff) {
      $scope.aff_type = 2;
    }

    // T = 1, K = 2, CP = 3, DA = 4, Impact Turns = 5, none = 0
    $scope.neg_choice = 0;

    if (judge.t) {
      $scope.neg_choice = 1;
    }

    if (judge.firstName && judge.lastName && judge.speedPref) {

    }
  };
});
