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

.controller('rrCtrl', function($scope, $state) {

  $scope.judge = {};

  $scope.rrNext = function(judge) {

    if (judge.firstName && judge.lastName && judge.speedPref && judge.aff_type && judge.neg_choice && judge.winner) {
      switch (judge.neg_choice) {
        case "t":
          $state.go('tab.rr-t');
          break;
        case "k":
          $state.go('tab-rr-k');
          break;
        case "cp":
          $state.go('tab-rr-cp');
          break;
        case "da":
          $state.go('tab-rr-da');
          break;
        case "it":
          $state.go('tab-rr-it');
          break;
      }
    }
    else {
      alert("Please fill out all fields.");
    }
  };
});
