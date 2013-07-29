'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('contactlist', [ '$scope', '$q',
    function($scope, Q) {
        $scope.contacts = [{displayName: 'ass'}];

        // forge.contact.selectAll(
        //     function (contacts) {
        //         $scope.$apply(function(){
        //              $scope.contacts = contacts;
        //         });
        //     },
        //     function (error) {
        //         alert("you done fucked up");
        //         alert(error);
        //     }
        // )

        var lulzPromise = function(){
          var defered = Q.defer();
          setTimeout(function(){
            defered.resolve("poop");
          },1);
          return defered.promise;
        }

        var lulz = lulzPromise();
        for(var i = 0; i < 30000; i++){
          lulz.then(function (message) {
             console.log(message);
          })
        }
        


        $scope.clicked = function (contact) {
           // forge.contact.selectById(contact.id, function (fullContact) {
           //      $scope.$apply( function () {
           //          $scope.textArea += fullContact.phoneNumbers[0].value;
           //      });
           // }, function () {

           // });
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