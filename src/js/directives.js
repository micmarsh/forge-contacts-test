'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('myApp.directives',[]).
    directive('whenScrolled', function () {
        return function (scope, elm, attr) {
            var raw = elm[0];
            elm.bind('scroll', function () {
                console.log('wut');
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attr.whenScrolled);
                }
            });
            console.log(elm);
        };
});