'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('notelist', [ '$scope', '$q', '$notes',
    function($scope, $q, $notes) {
      $scope.notes = [];
      $scope.tags = [];

      function setNotes(options) {
        $notes.get(options).then(function (notes){
          $scope.$apply(function(){
            $scope.notes = notes;
          })
        });
      };
      setNotes({});

      function setTags(options) {
        $notes.getTags(options).then(function (tags){
          $scope.$apply(function(){
            $scope.tags = tags;
          });
        }, function(error){
          console.log(error);
        });
      }
      setTags({});

      var selectedTags = [];
      $scope.toggleTag = function (tag) {
        var index = selectedTags.indexOf(tag);
        if(index === -1)
          selectedTags.push(tag);
        else
          selectedTags = selectedTags.slice(0, index) + selectedTags.slice(index + 1);
        $notes.getTags({hashtags: selectedTags});
      }
  }])
  .controller('MyCtrl2', [function() {

  }]);
