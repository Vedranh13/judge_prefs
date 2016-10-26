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
      var refJudges = new Firebase("https://judge-prefs.firebaseio.com/judges");
      var firstNameLower = judge.firstName.toLowerCase();
      var lastNameLower = judge.lastName.toLowerCase();

      refJudges.orderByChild("last_name").equalTo(lastNameLower).on("value", function(snapshot2) {
        var judgeFound = false;
        snapshot2.forEach(function(child) {
          if ((child.child("last_name").val() == lastNameLower) && (child.child("first_name").val() == firstNameLower)) {
            judgeFound = true;
          }
        });

        if (judgeFound === false) {

          var newJudge = {};

          newJudge.first_name = $rootScope.judge.firstName.toLowerCase();
          newJudge.last_name = $rootScope.judge.lastName.toLowerCase();
          newJudge.k_aff_num = 0;
          newJudge.k_aff_wr = 0;
          newJudge.num_reviews = 0;
          newJudge.phil = "No paradigm found";
          newJudge.spreading = 0;
          newJudge.trad_aff_num = 0;
          newJudge.trad_aff_wr = 0;
          newJudge.impact_turn = {};
          newJudge.impact_turn.aff_wr = 0;
          newJudge.impact_turn.it_num = 0;
          newJudge.T = {};
          newJudge.T.T_num = 0;
          newJudge.T.aff_flex_outweighs = 0;
          newJudge.T.aff_wr = 0;
          newJudge.T.condo_p = 0;
          newJudge.T.reasonability_p = 0;
          newJudge.T.we_meet_p = 0;
          newJudge.K = {};
          newJudge.K.K_num = 0;
          newJudge.K.aff_wr = 0;
          newJudge.K.case_outweights_wr = 0;
          newJudge.K.condo_wr = 0;
          newJudge.K.framework_wr = 0;
          newJudge.K.impact_turn_wr = 0;
          newJudge.K.no_alt_solvency_wr = 0;
          newJudge.K.perm_wr = 0;
          newJudge.DA = {};
          newJudge.DA.DA_num = 0;
          newJudge.DA.aff_wr = 0;
          newJudge.DA.case_outweights_wr = 0;
          newJudge.DA.condo_wr = 0;
          newJudge.DA.impact_turn_wr = 0;
          newJudge.DA.link_turn_wr = 0;
          newJudge.DA.no_impact_wr = 0;
          newJudge.DA.no_link_wr = 0;
          newJudge.CP = {};
          newJudge.CP.CP_num = 0;
          newJudge.CP.aff_wr = 0;
          newJudge.CP.condo_wr = 0;
          newJudge.CP.cp_theory_wr = 0;
          newJudge.CP.links_to_net_benefit = 0;
          newJudge.CP.offense_on_net_benefit = 0;
          newJudge.CP.perm_wr = 0;
          newJudge.CP.solvency_deficit = 0;

          refJudges.push(newJudge);

        }
      });
    }

    if (judge.firstName && judge.lastName && judge.speedPref && judge.aff_type && judge.neg_choice && judge.winner) {

      var ref = new Firebase("https://judge-prefs.firebaseio.com/user_uploads");
      var array = $firebaseArray(ref);
      $rootScope.judge = judge;
      if (($rootScope.judge.comments === null) || ($rootScope.judge.comments === "")) {
        $rootScope.judge.comments = "-1";
      }

      switch (judge.winner) {
        case "neg_win":
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

            $rootScope.k_aff_num = snapshot.child("k_aff_num").val();
            $rootScope.trad_aff_num = snapshot.child("trad_aff_num").val();
            $rootScope.T_num = snapshot.child('T').child("T_num").val();
            $rootScope.K_num = snapshot.child('K').child("K_num").val();
            $rootScope.CP_num = snapshot.child('CP').child("CP_num").val();
            $rootScope.DA_num = snapshot.child('DA').child("DA_num").val();
            $rootScope.it_num = snapshot.child('impact_turn').child("it_num").val();

            $rootScope.first_name = firstNameLower.substring(0,1).toUpperCase() + firstNameLower.substring(1);
            $rootScope.last_name = lastNameLower.substring(0,1).toUpperCase() + lastNameLower.substring(1);
            $rootScope.spreading = snapshot.child("spreading").val();

            $rootScope.aff_k_aff_wr = snapshot.child("k_aff_wr").val();
            $rootScope.trad_aff_wr = snapshot.child("trad_aff_wr").val();

            $rootScope.t_aff_wr = snapshot.child("T").child("aff_wr").val();
            $rootScope.t_we_meet_p = snapshot.child("T").child("we_meet_p").val();
            $rootScope.t_aff_flex_outweighs = snapshot.child("T").child("aff_flex_outweighs").val();
            $rootScope.t_reasonability_p = snapshot.child("T").child("reasonability_p").val();
            $rootScope.t_condo_p = snapshot.child("T").child("condo_p").val();

            $rootScope.k_aff_wr = snapshot.child("K").child("aff_wr").val();
            $rootScope.k_framework_wr = snapshot.child("K").child("framework_wr").val();
            $rootScope.k_case_outweights_wr = snapshot.child("K").child("case_outweights_wr").val();
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
            $rootScope.da_case_outweights_wr = snapshot.child("DA").child("case_outweights_wr").val();
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
      $scope.spreading = Math.round($rootScope.spreading);

      $scope.aff_k_aff_wr = Math.round($rootScope.aff_k_aff_wr * 100);
      $scope.trad_aff_wr = Math.round($rootScope.trad_aff_wr  * 100);
      if ($rootScope.trad_aff_num === 0) {
        $scope.trad_aff_wr_neg = 0;
      } else {
        $scope.trad_aff_wr_neg = Math.round(100 - $scope.trad_aff_wr);
      }
      if ($rootScope.k_aff_num === 0) {
        $scope.aff_k_aff_wr_neg = 0;
      } else {
        $scope.aff_k_aff_wr_neg = Math.round(100 - $scope.aff_k_aff_wr);
      }

      $scope.t_aff_wr = Math.round($rootScope.t_aff_wr * 100);
      if ($rootScope.T_num === 0) {
        $scope.t_aff_wr_neg = 0;
      } else {
        $scope.t_aff_wr_neg = Math.round(100 - $scope.t_aff_wr);
      }
      $scope.t_we_meet_p = Math.round($rootScope.t_we_meet_p * 100);
      $scope.t_aff_flex_outweighs = Math.round($rootScope.t_aff_flex_outweighs * 100);
      $scope.t_reasonability_p = Math.round($rootScope.t_reasonability_p * 100);
      $scope.t_condo_p = Math.round($rootScope.t_condo_p * 100);

      $scope.k_aff_wr = Math.round($rootScope.k_aff_wr * 100);
      if ($rootScope.K_num === 0) {
        $scope.k_aff_wr_neg = 0;
      } else {
        $scope.k_aff_wr_neg = Math.round(100 - $scope.k_aff_wr);
      }
      $scope.k_framework_wr = Math.round($rootScope.k_framework_wr * 100);
      $scope.k_case_outweights_wr = Math.round($rootScope.k_case_outweights_wr * 100);
      $scope.k_perm_wr = Math.round($rootScope.k_perm_wr * 100);
      $scope.k_impact_turn_wr = Math.round($rootScope.k_impact_turn_wr * 100);
      $scope.k_no_alt_solvency_wr = Math.round($rootScope.k_no_alt_solvency_wr * 100);
      $scope.k_condo_wr = Math.round($rootScope.k_condo_wr * 100);

      $scope.cp_aff_wr = Math.round($rootScope.cp_aff_wr * 100);
      if ($rootScope.CP_num === 0) {
        $scope.cp_aff_wr_neg = 0;
      } else {
        $scope.cp_aff_wr_neg = Math.round(100 - $scope.cp_aff_wr);
      }
      $scope.cp_condo_wr = Math.round($rootScope.cp_condo_wr * 100);
      $scope.cp_perm_wr = Math.round($rootScope.cp_perm_wr * 100);
      $scope.cp_cp_theory_wr = Math.round($rootScope.cp_cp_theory_wr * 100);
      $scope.cp_offense_on_net_benefit = Math.round($rootScope.cp_offense_on_net_benefit * 100);
      $scope.cp_links_to_net_benefit = Math.round($rootScope.cp_links_to_net_benefit * 100);
      $scope.cp_solvency_deficit = Math.round($rootScope.cp_solvency_deficit * 100);

      $scope.da_aff_wr = Math.round($rootScope.da_aff_wr * 100);
      if ($rootScope.DA_num === 0) {
        $scope.da_aff_wr_neg = 0;
      } else {
        $scope.da_aff_wr_neg = Math.round(100 - $scope.da_aff_wr);
      }
      $scope.da_condo_wr = Math.round($rootScope.da_condo_wr * 100);
      $scope.da_case_outweights_wr = Math.round($rootScope.da_case_outweights_wr * 100);
      $scope.da_no_link_wr = Math.round($rootScope.da_no_link_wr * 100);
      $scope.da_link_turn_wr = Math.round($rootScope.da_link_turn_wr * 100);
      $scope.da_no_impact_wr = Math.round($rootScope.da_no_impact_wr * 100);
      $scope.da_impact_turn_wr = Math.round($rootScope.da_impact_turn_wr * 100);

      $scope.impact_turn_aff_wr = Math.round($rootScope.impact_turn_aff_wr * 100);
      if ($rootScope.it_num === 0) {
        $scope.impact_turn_aff_wr_neg = 0;
      } else {
        $scope.impact_turn_aff_wr_neg = Math.round(100 - $scope.impact_turn_aff_wr);
      }

      if ($rootScope.phil == "I love Ashmita") {
        $scope.phil = "No paradigm found";
      }
      else {
        $scope.phil = $rootScope.phil;
      }

});
