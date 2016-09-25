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


.controller('searchCtrl', function($scope, $firebaseArray)  {
 var ref = new Firebase("http://judge-prefs.firebaseio.com/judges")
 var judges = $firebaseArray(ref)
 $scope.finder = {}
 $scope.searchNext = function() {
   console.log($scope)
  //  console.log($scope)
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

.controller('rr-tCtrl', function($scope, $state) {})


.controller('rrCtrl', function($scope, $state) {

  $scope.judge = {};

  $scope.rrNext = function(judge) {

    if (judge.firstName && judge.lastName && judge.speedPref && judge.aff_type && judge.neg_choice && judge.winner) {
      outputter.setOutput(judge);
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
