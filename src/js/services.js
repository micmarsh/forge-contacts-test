'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


angular.module('myApp.services').service('$kinvey', [ function($kinvey){
    var LULZ_APP = {
        appKey: 'kid_ePfBz7N8xf',
        appSecret: 'e13392c82e8b4ba597ad8c043c991100'
    };

    var REAL = {
        appKey: 'kid_PVtSim6Wi5',
        appSecret: 'c429fbc2a46d4ac4930f67ef7e4f8a8e'
    };

    var APP = REAL;
    APP['sync'] = {
        enable: true,
        online: navigator.onLine
    };

    Kinvey.fnUserPromise = Kinvey.init(APP);
    Kinvey.Sync.online();

    return Kinvey;
}]);

angular.module('myApp.services').service('$notes', [ '$kinvey', function ($kinvey) {
    this.get = function () {
        var blankQuery = new Kinvey.Query()
        var promise = Kinvey.DataStore.count('notes', blankQuery, {offline: true});
        return promise.then(function(count){
            var options = {};
            options.offline = !!count
            return Kinvey.DataStore.find('notes', blankQuery, options )
        });
    };
}]);
