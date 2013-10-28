'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('notelist', [ '$scope', '$q', '$notes',
    function($scope, $q, $notes) {

      $notes.get().then(function (notes){
        $scope.$apply(function(){
          $scope.notes = notes;
        })
      });

      $notes.getTags().then(function (tags){
        $scope.$apply(function(){
          $scope.tags = tags;
        });
      }, function(error){
        console.log(error);
      });
  }])
  .controller('MyCtrl2', [function() {

  }]);
