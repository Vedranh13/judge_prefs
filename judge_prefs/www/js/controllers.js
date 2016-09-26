angular.module('starter.controllers', ['firebase','ionic'])

.controller('DashCtrl', function($scope) {})

.controller('sj-resultsCtrl', function($scope,$rootScope) {

      $scope.first_name = $rootScope.first_name;
      $scope.last_name = $rootScope.last_name;
      $scope.spreading = $rootScope.spreading;

      $scope.k_aff_wr = $rootScope.k_aff_wr * 10;
      $scope.trad_aff_wr = $rootScope.trad_aff_wr  * 10;
      if ($scope.trad_aff_wr === 0) {
        $scope.trad_aff_wr_neg = 0;
      } else {
        $scope.trad_aff_wr_neg = 100 - $scope.trad_aff_wr;
      }
      if ($scope.k_aff_wr === 0) {
        $scope.k_aff_wr_neg = 0;
      } else {
        $scope.k_aff_wr_neg = 100 - $scope.k_aff_wr;
      }

      $scope.t_aff_wr = $rootScope.t_aff_wr * 10;
      if ($scope.t_aff_wr === 0) {
        $scope.t_aff_wr_neg = 0;
      } else {
        $scope.t_aff_wr_neg = 100 - $scope.t_aff_wr;
      }
      $scope.t_we_meet_p = $rootScope.t_we_meet_p * 10;
      $scope.t_aff_flex_outweighs = $rootScope.t_aff_flex_outweighs * 10;
      $scope.t_reasonability_p = $rootScope.t_reasonability_p * 10;
      $scope.t_condo_p = $rootScope.t_condo_p * 10;

      $scope.k_aff_wr = $rootScope.k_aff_wr * 10;
      if ($scope.k_aff_wr === 0) {
        $scope.k_aff_wr_neg = 0;
      } else {
        $scope.k_aff_wr_neg = 100 - $scope.k_aff_wr;
      }
      $scope.k_framework_wr = $rootScope.k_framework_wr * 10;
      $scope.k_case_outweighs_wr = $rootScope.k_case_outweighs_wr * 10;
      $scope.k_perm_wr = $rootScope.k_perm_wr * 10;
      $scope.k_impact_turn_wr = $rootScope.k_impact_turn_wr * 10;
      $scope.k_no_alt_solvency_wr = $rootScope.k_no_alt_solvency_wr * 10;
      $scope.k_condo_wr = $rootScope.k_condo_wr * 10;

      $scope.cp_aff_wr = $rootScope.cp_aff_wr * 10;
      if ($scope.cp_aff_wr === 0) {
        $scope.cp_aff_wr_neg = 0;
      } else {
        $scope.cp_aff_wr_neg = 100 - $scope.cp_aff_wr;
      }
      $scope.cp_condo_wr = $rootScope.cp_condo_wr * 10;
      $scope.cp_perm_wr = $rootScope.cp_perm_wr * 10;
      $scope.cp_cp_theory_wr = $rootScope.cp_cp_theory_wr * 10;
      $scope.cp_offense_on_net_benefit = $rootScope.cp_offense_on_net_benefit * 10;
      $scope.cp_links_to_net_benefit = $rootScope.cp_links_to_net_benefit * 10;
      $scope.cp_solvency_deficit = $rootScope.cp_solvency_deficit * 10;

      $scope.da_aff_wr = $rootScope.da_aff_wr * 10;
      if ($scope.da_aff_wr === 0) {
        $scope.da_aff_wr_neg = 0;
      } else {
        $scope.da_aff_wr_neg = 100 - $scope.da_aff_wr;
      }
      $scope.da_condo_wr = $rootScope.da_condo_wr * 10;
      $scope.da_case_outweighs_wr = $rootScope.da_case_outweighs_wr * 10;
      $scope.da_no_link_wr = $rootScope.da_no_link_wr * 10;
      $scope.da_link_turn_wr = $rootScope.da_link_turn_wr * 10;
      $scope.da_no_impact_wr = $rootScope.da_no_impact_wr * 10;
      $scope.da_impact_turn_wr = $rootScope.da_impact_turn_wr * 10;

      $scope.impact_turn_aff_wr = $rootScope.impact_turn_aff_wr * 10;
      if ($scope.impact_turn_aff_wr === 0) {
        $scope.impact_turn_aff_wr_neg = 0;
      } else {
        $scope.impact_turn_aff_wr_neg = 100 - $scope.impact_turn_aff_wr;
      }

      $scope.phil = $rootScope.phil;

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

    if ($scope.finder.f && $scope.finder.l) {

      var firstNameLower = $scope.finder.f.toLowerCase();
      var lastNameLower = $scope.finder.l.toLowerCase();

      ref.orderByChild("last_name").equalTo(lastNameLower).on("child_added", function(snapshot) {
        if (snapshot.child("first_name").val() == firstNameLower) {

          $rootScope.first_name = firstNameLower.substring(0,1).toUpperCase() + firstNameLower.substring(1);
          $rootScope.last_name = lastNameLower.substring(0,1).toUpperCase() + lastNameLower.substring(1);
          $rootScope.spreading = snapshot.child("spreading").val();

          $rootScope.k_aff_wr = snapshot.child("k_aff_wr").val();
          $rootScope.trad_aff_wr = snapshot.child("trad_aff_wr").val();

          $rootScope.t_aff_wr = snapshot.child("T").child("aff_wr").val();
          $rootScope.t_we_meet_p = snapshot.child("T").child("we_meet").val();
          $rootScope.t_aff_flex_outweighs = snapshot.child("T").child("aff_flex_outweighs").val();
          $rootScope.t_reasonability_p = snapshot.child("T").child("reasonability_p").val();
          $rootScope.t_condo_p = snapshot.child("T").child("condo_p").val();

          $rootScope.k_aff_wr = snapshot.child("K").child("aff_wr").val();
          $rootScope.k_framework_wr = snapshot.child("K").child("framework_wr").val();
          $rootScope.k_case_outweighs_wr = snapshot.child("K").child("case_outweighs_wr").val();
          $rootScope.k_perm_wr = snapshot.child("K").child("perm_wr").val();
          $rootScope.k_impact_turn_wr = snapshot.child("K").child("impact_turn_wr").val();
          $rootScope.k_no_alt_solvency_wr = snapshot.child("K").child("no_alt_solvency_wr").val();
          $rootScope.k_condo_wr = snapshot.child("K").child("condo_wr").val();

          $rootScope.cp_aff_wr = snapshot.child("CP").child("aff_wr").val();
          $rootScope.cp_condo_wr = snapshot.child("CP").child("condo_wr").val();
          $rootScope.cp_perm_wr = snapshot.child("CP").child("perm_wr").val();
          $rootScope.cp_cp_theory_wr = snapshot.child("CP").child("cp_theory_wr").val();
          $rootScope.cp_offense_on_net_benefit = snapshot.child("CP").child("offense_on_net_benefit").val();
          $rootScope.cp_links_to_net_benefit = snapshot.child("CP").child("links_to_net_benefit").val();
          $rootScope.cp_solvency_deficit = snapshot.child("CP").child("solvency_deficit").val();

          $rootScope.da_aff_wr = snapshot.child("DA").child("aff_wr").val();
          $rootScope.da_condo_wr = snapshot.child("DA").child("condo_wr").val();
          $rootScope.da_case_outweighs_wr = snapshot.child("DA").child("case_outweighs_wr").val();
          $rootScope.da_no_link_wr = snapshot.child("DA").child("no_link_wr").val();
          $rootScope.da_link_turn_wr = snapshot.child("DA").child("link_turn_wr").val();
          $rootScope.da_no_impact_wr = snapshot.child("DA").child("no_impact_wr").val();
          $rootScope.da_impact_turn_wr = snapshot.child("DA").child("impact_turn_wr").val();

          $rootScope.impact_turn_aff_wr = snapshot.child("impact_turn").child("aff_wr").val();

          $rootScope.phil = snapshot.child("phil").val();

          $state.go('sj-results');
        }

      });

    } else {
      var alertPopuptwo = $ionicPopup.alert({
        title: "Input first and last name."
      });
    }

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
