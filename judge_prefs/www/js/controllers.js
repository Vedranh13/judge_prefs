angular.module('starter.controllers', ['firebase','ionic'])

.controller('DashCtrl', function($scope) {})

.controller('sj-resultsCtrl', function($scope) {
})

.controller('rr-itCtrl', function($scope, $rootScope, $state,$firebaseArray, $ionicPopup) {
  $scope.judgethree = {};

  $scope.rrSubmitOp = function(judgethree) {
    $rootScope.judge.comments = judgethree.comments;
    if(typeof $rootScope.judge.comments == 'undefined'){
       $rootScope.judge.comments = "-1";
      }
      $rootScope.judge.rfd = "-1";
      $rootScope.judge.firstName = $rootScope.judge.firstName.toLowerCase();
      $rootScope.judge.lastName = $rootScope.judge.lastName.toLowerCase();
      var ref = new Firebase("https://judge-prefs.firebaseio.com/");
      //var outer = $firebaseArray(ref);
      //console.log("length of outer");
      //console.log(outer.length);
      var array = $firebaseArray(ref.child("user_uploads"));
      array.$loaded().then(function(array) {
      $rootScope.judge.upload_number = array.length+1;
      array.$add($rootScope.judge);
      var alertPopup = $ionicPopup.alert({
        title: "Round Report submitted."
        });
      });
    $state.go('tab.dash');
  };
})

.controller('searchCtrl', function($scope, $state, $firebaseArray, $ionicPopup)  {
 var ref = new Firebase("http://judge-prefs.firebaseio.com/judges");
 var judges = $firebaseArray(ref);
 $scope.finder = {};
 $scope.searchNext = function() {
   var judgeFound = 0;
   for(var i = 0; i < judges.length; i++) {
    if ($scope.finder.f.toLowerCase() == judges[i].first_name && $scope.finder.l.toLowerCase() == judges[i].last_name) {
       judgeFound=1;
       $state.go('sj-results');
     }
   }
    if(judgeFound===0){
      var alertPopupThree = $ionicPopup.alert({
        title: "Judge Not Found."
        });
   }
};})


.controller('rr-tCtrl', function($scope, $rootScope, $state, $firebaseArray, $ionicPopup) {
  $scope.judgetwo = {};

  $scope.rrSubmit = function(judgetwo) {
    if (judgetwo.rfd) {
      $rootScope.judge.rfd = judgetwo.rfd;
      $rootScope.judge.comments = judgetwo.comments;
      if(typeof $rootScope.judge.comments == 'undefined'){
        $rootScope.judge.comments = "-1";
      }
      $rootScope.judge.firstName = $rootScope.judge.firstName.toLowerCase();
      $rootScope.judge.lastName = $rootScope.judge.lastName.toLowerCase();
      var ref = new Firebase("https://judge-prefs.firebaseio.com/");
      var array = $firebaseArray(ref.child("user_uploads"));
      array.$loaded().then(function(array) {
      $rootScope.judge.upload_number = array.length+1;
      array.$add($rootScope.judge);
      var alertPopup = $ionicPopup.alert({
        title: "Round Report submitted."
      });
      $state.go('tab.dash');
      });
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
