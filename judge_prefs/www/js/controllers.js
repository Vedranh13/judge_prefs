angular.module('starter.controllers', ['firebase','ionic'])

.controller('DashCtrl', function($scope) {})

.controller('sj-resultsCtrl', function($scope,$rootScope,$firebaseArray) {

      var ref = new Firebase("https://judge-prefs.firebaseio.com/");
      var array = $firebaseArray(ref.child("judges"));
      array.$loaded().then(function(array) {
        $scope.jinfo = array[$rootScope.jid]; //need a judge name
      });
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
      var array = $firebaseArray(ref.child("user_uploads"));
      array.$loaded().then(function(array) {
      $rootScope.judge.upload_number = array.length+1;
      array.$add($rootScope.judge);
      var alertPopup = $ionicPopup.alert({
        title: "Round Report submitted."
        });
      $state.go('tab.dash');
      });
  };
})

.controller('searchCtrl', function($scope, $state, $firebaseObject, $ionicPopup, $rootScope) {

  $scope.finder = {};

  var ref = new Firebase("https://judge-prefs.firebaseio.com/judges");

  $scope.searchNext = function() {

    var firstNameLower = $scope.finder.f.toLowerCase();
    var lastNameLower = $scope.finder.l.toLowerCase();

    ref.orderByChild("last_name").equalTo(lastNameLower).on("child_added", function(snapshot) {
      if (snapshot.child("first_name").val() == firstNameLower) {

      $rootScope.first_name = firstNameLower;
      $rootScope.last_name = lastNameLower;
      $rootScope.spreading = snapshot.child("spreading").val();

      $rootScope.k_aff_wr = snapshot.child("k_aff_wr").val();
      $rootScope.trad_aff_wr = snapshot.child("trad_aff_wr").val();

      $rootScope.t_aff_wr = snapshot.child("T").child("aff_wr").val();
      $rootScope.t_we_meet_p = judges[i].T.we_meet_p;
      $rootScope.t_aff_flex_outweighs = judges[i].T.aff_flex_outweighs;
      $rootScope.t_reasonability_p = judges[i].T.reasonability_p;
      $rootScope.t_condo_p = judges[i].T.condo_p;

      $rootScope.k_aff_wr = judges[i].K.aff_wr;
      $rootScope.k_framework_wr = judges[i].K.framework_wr;
      $rootScope.k_case_outweighs_wr = judges[i].K.case_outweighs_wr;
      $rootScope.k_perm_wr = judges[i].K.perm_wr;
      $rootScope.k_impact_turn_wr = judges[i].K.impact_turn_wr;
      $rootScope.k_no_alt_solvency_wr = judges[i].K.no_alt_solvency_wr;
      $rootScope.k_condo_wr = judges[i].K.condo_wr;

      $rootScope.cp_aff_wr = judges[i].CP.aff_wr;
      $rootScope.cp_condo_wr = judges[i].CP.condo_wr;
      $rootScope.cp_perm_wr = judges[i].CP.perm_wr;
      $rootScope.cp_cp_theory_wr = judges[i].CP.cp_theory_wr;
      $rootScope.cp_offense_on_net_benefit = judges[i].CP.offense_on_net_benefit;
      $rootScope.cp_links_to_net_benefit = judges[i].CP.links_to_net_benefit;
      $rootScope.cp_solvency_deficit = judges[i].CP.solvency_deficit;

      $rootScope.da_aff_wr = judges[i].DA.aff_wr;
      $rootScope.da_condo_wr = judges[i].DA.condo_wr;
      $rootScope.da_case_outweighs_wr = judges[i].DA.case_outweighs_wr;
      $rootScope.da_no_link_wr = judges[i].DA.no_link_wr;
      $rootScope.da_link_turn_wr = judges[i].DA.link_turn_wr;
      $rootScope.da_no_impact_wr = judges[i].DA.no_impact_wr;
      $rootScope.da_impact_turn_wr = judges[i].DA.impact_turn_wr;

      $rootScope.impact_turn_aff_wr = judges[i].impact_turn.aff_wr;

      $rootScope.phil = judges[i].phil;
      }
    });

  };

})


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
