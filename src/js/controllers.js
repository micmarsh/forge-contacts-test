'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('notelist', [ '$scope', '$q', '$notes',
    function($scope, $q, $notes) {
      $notes.get().then(function(notes){
        $scope.$apply(function(){
          $scope.notes = notes;
        })
      });

  }])
  .controller('MyCtrl2', [function() {

  }]);
