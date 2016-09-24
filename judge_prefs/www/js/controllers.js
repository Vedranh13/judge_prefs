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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

<<<<<<< HEAD
.controller('searchCtrl', function($scope) {
=======
.controller('rr-tCtrl', function($scope, $rootScope) {
  $scope.judgetwo = {};
>>>>>>> bf9104c89c137a7806ba3f2d6728c8c611bd091f

  $scope.rrSubmit = function(judgetwo) {
    if (judgetwo.rfd) {
      $rootScope.judge.rfd = judgetwo.rfd;
      $rootScope.judge.comments = judgetwo.comments;
    }
    else {
      alert("Please input the reason for decision.");
    }
  };
})
<<<<<<< HEAD
.controller('rr-tCtrl', function($scope, $state) {})
=======
>>>>>>> bf9104c89c137a7806ba3f2d6728c8c611bd091f

.controller('rrCtrl', function($scope, $state, $rootScope) {

  $scope.judge = {};

  $scope.rrNext = function(judge) {

    if (judge.firstName && judge.lastName && judge.speedPref && judge.aff_type && judge.neg_choice && judge.winner) {
      $rootScope.judge = judge;
      switch (judge.neg_choice) {
        case "t":
          $state.go('rr-t');
          break;
      }
    }
    else {
      alert("Please fill out all fields.");
    }
  };
});
