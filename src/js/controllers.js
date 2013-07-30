'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('contactlist', [ '$scope', '$q', '$timeout',
    function($scope, $q, $timeout) {
        var FORGE = !!window.forge
        var FAKES = [{name: "Me"},
                        {name:"You"},
                        {name: "Them"},
                        {name: "name"},
                        {name: "Nombre"},
                        {name: "Hermano"},
                        {name: "Homie"},
                        {name: "Butts"}];

        function getMoreContacts (counter) {
          var q = $q.defer();
          if (FORGE)
            forge.internal.call('get.some', {}, function (contacts) {
              q.resolve(contacts);
            }, function (error) {
              q.reject(error);
            });
          else
            $timeout(function () {
              q.resolve(FAKES);
            }, 500);
          return q.promise; 
        };
        var counter = 0;

        $scope.contacts = [];
        $scope.loadMore = function () {
           getMoreContacts(counter).then(function (contacts) {
                //$scope.$apply(function () {
                  for (var i = 0; i < contacts.length; i++) {
                      $scope.contacts.push(contacts[i]);
                  }
                  counter += contacts.length; 
               // });
           
          });
        }
        $scope.clicked = function (contact) {
        
        }

        $scope.loadMore();
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