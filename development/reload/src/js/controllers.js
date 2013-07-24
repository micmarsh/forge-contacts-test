'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('contactlist', [ '$scope',
    function($scope) {
        $scope.contacts = [{displayName: 'ass'}];

        forge.contact.selectAll(
            function (contacts) {
                $scope.$apply(function(){
                     $scope.contacts = contacts;
                });
            },
            function (error) {
                alert("you done fucked up");
                alert(error);
            }
        )


        $scope.clicked = function (contact) {
           forge.contact.selectById(contact.id, function (fullContact) {
                $scope.$apply( function () {
                    $scope.textArea += fullContact.phoneNumbers[0].value;
                });
           }, function () {

           });
        }
       // setInterval(function () {console.log($scope.textArea);}, 5000);

  // forge.contact.select(
  //       function (selected) {
  //           alert(JSON.stringify(selected));
  //       },
  //       function () {}
  //   );
  }])
  .controller('MyCtrl2', [function() {

  }]);