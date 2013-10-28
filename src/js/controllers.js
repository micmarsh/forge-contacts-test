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
        if(index === -1){
          selectedTags.push(tag);
          console.log(selectedTags);

        }else{
          //TODO: wire up actual queries to make sure it filters down, should be pretty
          //simple with query service, but then either place tag list next to notes,
          //or make horizontal like app
          selectedTags = selectedTags.slice(0, index).concat(selectedTags.slice(index + 1));
          console.log(selectedTags);
        }
        $notes.getTags({hashtags: selectedTags});
      }
  }])
  .controller('MyCtrl2', [function() {

  }]);
