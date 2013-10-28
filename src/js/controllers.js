'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('notelist', [ '$scope', '$q', '$notes',
    function($scope, $q, $notes) {
      $scope.notes = [];
      $scope.tags = [];

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

      var selectedTags = [];
      $scope.toggleTag = function (tag) {

      }
  }])
  .controller('MyCtrl2', [function() {

  }]);
