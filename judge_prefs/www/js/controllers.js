angular.module('starter.controllers', ['firebase','ionic'])

.controller('homeCtrl', function($scope, $state) {

  $scope.submitRoundReport = function() {
    $state.go('submitRoundReport');
  };

  $scope.searchJudges = function() {
    $state.go('search');
  };
})

.controller('submitRoundReportCtrl', function($ionicHistory, $firebaseArray, $scope, $rootScope, $state, $ionicPopup) {

  $rootScope.judge = {};
  $scope.judge = {};

  $scope.rrNext = function(judge) {

    if (judge.firstName && judge.lastName && judge.speedPref && judge.aff_type && judge.neg_choice && judge.winner) {

      var ref = new Firebase("https://judge-prefs.firebaseio.com/user_uploads");
      var array = $firebaseArray(ref);
      $rootScope.judge = judge;

      switch (judge.winner) {
        case "neg_win":
          $rootScope.judge.comments = "-1";
          $rootScope.judge.rfd = "-1";
          $rootScope.judge.firstName = $rootScope.judge.firstName.toLowerCase();
          $rootScope.judge.lastName = $rootScope.judge.lastName.toLowerCase();
          $rootScope.judge.upload_number = array.length+1;

          array.$add($rootScope.judge);

          var alertPopup = $ionicPopup.alert({title: "Round Report Submitted."});
          $ionicHistory.goBack(-1);
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
              $rootScope.judge.comments = "-1";
              $rootScope.judge.rfd = "-1";
              $rootScope.judge.firstName = $rootScope.judge.firstName.toLowerCase();
              $rootScope.judge.lastName = $rootScope.judge.lastName.toLowerCase();
              $rootScope.judge.upload_number = array.length+1;

              array.$add($rootScope.judge);

              var alertPopup2 = $ionicPopup.alert({title: "Round Report Submitted."});
              $ionicHistory.goBack(-1);
              break;
          }
          break;
      }

      var ref2 = new Firebase("https://judge-prefs.firebaseio.com/judges");
      var array2 = $firebaseArray(ref2);
      var firstNameLower = judge.firstName.toLowerCase();
      var lastNameLower = judge.firstName.toLowerCase();
      $scope.newJudge = {};

      ref2.orderByChild("last_name").equalTo(lastNameLower).on("value", function(snapshot2) {
        var judgeFound = false;
        snapshot2.forEach(function(child) {
          if ((child.child("last_name").val() == lastNameLower) && (child.child("first_name").val() == firstNameLower)) {
            judgeFound = true;
          }
        });
        if (judgeFound === false) {
          newJudge.first_name = firstNameLower;
          newJudge.last_name = lastnameLower;
          newJudge.k_aff_num = 0;
          newJudge.k_aff_wr = 0;
          newJudge.num_reviews = 0;
          newJudge.phil = "No paradigm found";
          newJudge.spreading = 0;
          newJudge.trad_aff_num = 0;
          newJudge.trad_aff_wr = 0;
          newJudge.impact_turn.aff_wr = 0;
          newJudge.impact_turn.it_num = 0;
          newJudge.T.T_num = 0;
          newJudge.T.aff_flex_outweighs = 0;
          newJudge.T.aff_wr = 0;
          newJudge.T.condo_p = 0;
          newJudge.T.reasonability_p = 0;
          newJudge.T.we_meet_p = 0;
          newJudge.K.K_num = 0;
          newJudge.K.aff_wr = 0;
          newJudge.K.case_outweighs_wr = 0;
          newJudge.K.condo_wr = 0;
          newJudge.K.framework_wr = 0;
          newJudge.K.impact_turn_wr = 0;
          newJudge.K.no_alt_solvency_wr = 0;
          newJudge.K.perm_wr = 0;
          newJudge.DA.DA_num = 0;
          newJudge.DA.aff_wr = 0;
          newJudge.DA.case_outweighs_wr = 0;
          newJudge.DA.condo_wr = 0;
          newJudge.DA.impact_turn_wr = 0;
          newJudge.DA.link_turn_wr = 0;
          newJudge.DA.no_impact_wr = 0;
          newJudge.DA.no_link_wr = 0;
          newJudge.CP.CP_num = 0;
          newJudge.CP.aff_wr = 0;
          newJudge.CP.condo_wr = 0;
          newJudge.CP.cp_theory_wr = 0;
          newJudge.CP.links_to_net_benefit = 0;
          newJudge.CP.offense_on_net_benefit = 0;
          newJudge.CP.perm_wr = 0;
          newJudge.CP.solvency_deficit = 0;

          array2.$add(newJudge);
        }
      });
    }
    else {
      var alertPopup3 = $ionicPopup.alert({title: "Please enter all fields."});
    }
  };
})

.controller('rr-Ctrl', function($ionicHistory, $scope, $rootScope, $state, $firebaseArray, $ionicPopup) {
  $scope.judgetwo = {};

  $scope.rrSubmit = function(judgetwo) {
    if (judgetwo.rfd) {
      $rootScope.judge.rfd = judgetwo.rfd;
      $rootScope.judge.comments = "-1";
      $rootScope.judge.firstName = $rootScope.judge.firstName.toLowerCase();
      $rootScope.judge.lastName = $rootScope.judge.lastName.toLowerCase();

      var ref = new Firebase("https://judge-prefs.firebaseio.com/user_uploads");
      var array = $firebaseArray(ref);
      $rootScope.judge.upload_number = array.length+1;

      array.$add($rootScope.judge);

      var alertPopup4 = $ionicPopup.alert({title: "Round Report Submitted."});
      $ionicHistory.goBack(-2);
    }
    else {
      var alertPopup5 = $ionicPopup.alert({title: "Please enter the reason for decision."});
    }
  };
})

.controller('searchCtrl', function($scope, $rootScope, $ionicPopup, $state) {

  $scope.finder = {};

  $scope.searchNext = function(finder) {
    if ($scope.finder.f && $scope.finder.l) {
      var ref = new Firebase("https://judge-prefs.firebaseio.com/judges");
      var firstNameLower = $scope.finder.f.toLowerCase();
      var lastNameLower = $scope.finder.l.toLowerCase();

      ref.orderByChild("last_name").equalTo(lastNameLower).on("value", function(snapshot2) {
        var judgeFound = false;
        snapshot2.forEach(function(child) {
          if ((child.child("last_name").val() == lastNameLower) && (child.child("first_name").val() == firstNameLower)) {
            judgeFound = true;

            var snapshot = child;

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

            $state.go('searchresults');
          }
        });
        if (judgeFound === false) {
          var alertPopup6 = $ionicPopup.alert({title: "Judge Not Found."});
        }
      });

    } else {
      var alertPopup7 = $ionicPopup.alert({title: "Please enter name."});
    }
  };
})

.controller('searchresultsCtrl', function($scope, $rootScope, $state) {

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

});
