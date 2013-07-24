'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('scrubEmails', [function () {
    return function (userObjects) {
        var results = [],
            i = 0;

        for (i = 0; i < userObjects.length; i++) {
            if(userObjects[i].displayName.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/ig))
                results.push(userObjects[i]);
        }
        return results;
    }

  }]);