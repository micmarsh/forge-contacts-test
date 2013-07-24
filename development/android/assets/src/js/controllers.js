'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('contactlist', [ '$scope',
    function($scope) {
        $scope.contacts = [{displayName: 'ass'}];

        forge.contact.selectAll(
            function (contacts) {
                $scope.contacts = contacts;
            },
            function (error) {
                alert("you done fucked up");
                alert(error);
            }
        )

  // forge.contact.select(
  //       function (selected) {
  //           alert(JSON.stringify(selected));
  //       },
  //       function () {}
  //   );
  }])
  .controller('MyCtrl2', [function() {

  }]);