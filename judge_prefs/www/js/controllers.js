angular.module('starter.controllers', ['firebase','ionic'])

.controller('DashCtrl', function($scope) {})

.controller('rr-itCtrl', function($scope, $rootScope, $state,$firebaseArray, $ionicPopup) {
  $scope.judgethree = {};

  $scope.rrSubmitOp = function(judgethree) {
    $rootScope.judge.comments = judgethree.comments;
    $rootScope.judge.rfd = "-1";
      var ref = new Firebase("https://judge-prefs.firebaseio.com/");
      var array = $firebaseArray(ref.child("user_uploads"));
      array.$add($rootScope.judge);
      var alertPopup = $ionicPopup.alert({
        title: "Round Report submitted."
      });
    $state.go('tab.dash');
  };
})



.controller('searchCtrl', function($scope, $firebaseArray)  {
 var ref = new Firebase("http://judge-prefs.firebaseio.com/judges")
 var judges = $firebaseArray(ref)
 $scope.finder = {}
 $scope.searchNext = function() {
   var judgeFound = 0
   for(var i = 0; i < judges.length; i++) {
    if ($scope.finder.f == judges[i].first_name && $scope.finder.l == judges[i].last_name) {
       console.log(judges[i])
       judgeFound=1;
     }
   }
    if(judgeFound==0){
      alert("Judge not found.")
   }
}})


.controller('rr-tCtrl', function($scope, $rootScope, $state, $firebaseArray, $ionicPopup) {
  $scope.judgetwo = {};

  $scope.rrSubmit = function(judgetwo) {
    if (judgetwo.rfd) {
      $rootScope.judge.rfd = judgetwo.rfd;
      $rootScope.judge.comments = judgetwo.comments;
      var ref = new Firebase("https://judge-prefs.firebaseio.com/");
      var array = $firebaseArray(ref.child("user_uploads"));
      array.$add($rootScope.judge);
      var alertPopup = $ionicPopup.alert({
        title: "Round Report submitted."
      });
      $state.go('tab.dash');
    }
    else {
      var alertPopuptwo = $ionicPopup.alert({
        title: "Please enter the reason for decision."
      });
    }
  };
})

.controller('rrCtrl', function($scope, $state, $rootScope, $ionicPopup) {

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
      var alertPopup = $ionicPopup.alert({
        title: "Please enter all fields."
      });
    }
  };
});
