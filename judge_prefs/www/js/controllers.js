angular.module('starter.controllers', ['firebase','ionic'])

.controller('DashCtrl', function($scope) {})

<<<<<<< HEAD
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

.controller('rr-itCtrl', function($scope, $rootScope, $state,$firebaseArray) {
  $scope.judgethree = {};

  $scope.rrSubmitOp = function(judgethree) {
    $rootScope.judge.comments = judgethree.comments;
    $rootScope.judge.rfd = "-1";
      var ref = new Firebase("https://judge-prefs.firebaseio.com/");
      var array = $firebaseArray(ref.child("user_uploads"));
      array.$add($rootScope.judge);
    alert("Round report submitted.");
    $state.go('tab.dash');
  };
})

.controller('rr-tCtrl', function($scope, $rootScope, $state, $firebaseArray) {
  $scope.judgetwo = {};

  $scope.rrSubmit = function(judgetwo) {
    if (judgetwo.rfd) {
      $rootScope.judge.rfd = judgetwo.rfd;
      $rootScope.judge.comments = judgetwo.comments;
      var ref = new Firebase("https://judge-prefs.firebaseio.com/");
      var array = $firebaseArray(ref.child("user_uploads"));
      array.$add($rootScope.judge);
      alert("Round report submitted.");
      $state.go('tab.dash');
    }
    else {
      alert("Please input the reason for decision.");
    }
  };
})

.controller('rrCtrl', function($scope, $state, $rootScope) {

  $scope.judge = {};

  $scope.rrNext = function(judge) {

    if (judge.firstName && judge.lastName && judge.speedPref && judge.aff_type && judge.neg_choice && judge.winner) {
      $rootScope.judge = judge;
      switch (judge.winner) {
        case "neg_win":
          $state.go('rr-it');
          break;
        case "aff_win":
          switch (judge.neg_choice) {
            case "t":
              $state.go('rr-t');
              break;
            case "k":
              $state.go('rr-k');
              break;
            case "cp":
              $state.go('rr-cp');
              break;
            case "da":
              $state.go('rr-da');
              break;
            case "it":
              $state.go('rr-it');
              break;
          }
          break;
      }
    }
    else {
      alert("Please fill out all fields.");
    }
  };
});
